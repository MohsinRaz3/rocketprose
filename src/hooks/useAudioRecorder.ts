import { useState, useRef, useCallback } from 'react';
import { AudioState } from '../types';
import { GenerateProse, submitAudioFileAndGetAudioTranscription } from '../components/apicalling';

export function useAudioRecorder(transcriptStyle?: string) {
  const [audioState, setAudioState] = useState<AudioState>({
    isRecording: false,
    isPaused: false,
    duration: 0,
    audioUrl: null,
    prose: "",
    isError : ""
  });
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<number>();

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = async () => { // Added 'async' here
        const blob = new Blob(chunks.current, { type: 'audio/ogg; codecs=opus' });
        const audioTranscription= await submitAudioFileAndGetAudioTranscription(blob); // This will now work correctly
        const proseRes = await GenerateProse(audioTranscription,transcriptStyle); // This will now work correctly
        if(audioTranscription !=="Error" && proseRes !=="Error" ){
          setAudioState(prev => ({
            ...prev, // Spread previous state to ensure a new object is created
            prose: proseRes,
          }));
                    
        }
        else{
          setAudioState(prev => ({ ...prev, isError:"Error" }));
        }


        chunks.current = [];
      };
      

      mediaRecorder.current.start();
      setAudioState(prev => ({ ...prev, isRecording: true, isPaused: false }));

      timerRef.current = window.setInterval(() => {
        setAudioState(prev => ({ ...prev, duration: prev.duration + 1 }));
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      clearInterval(timerRef.current);
      setAudioState(prev => ({ ...prev, isRecording: false }));
    }
  }, []);

  const pauseRecording = useCallback(() => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.pause();
      clearInterval(timerRef.current);
      setAudioState(prev => ({ ...prev, isPaused: true }));
    }
  }, []);

  const resumeRecording = useCallback(() => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'paused') {
      mediaRecorder.current.resume();
      timerRef.current = window.setInterval(() => {
        setAudioState(prev => ({ ...prev, duration: prev.duration + 1 }));
      }, 1000);
      setAudioState(prev => ({ ...prev, isPaused: false }));
    }
  }, []);

  return {
    audioState,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  };
}