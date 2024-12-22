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
    isError : "",
    isLoading : false,
    transcriptStyle:"You are a skilled transcriptionist. Convert the spoken input into a clean, polished written transcript while maintaining the original meaning. Fix any speech disfluencies, remove filler words (um, uh, like), and correct grammar without changing the core message. Format the text with proper punctuation and paragraphing. Keep contractions and casual language if they were intentionally used. Do not add interpretations or additional content. Focus on producing a clear, professional transcript that reads naturally while staying true to the speaker's intended message."
  });
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<number>();
console.log("audio state transcriptStyle #a",transcriptStyle)
  const startRecording = useCallback(async () => {
    console.log("audio state transcriptStyle after api call 1 #api",transcriptStyle)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };
      console.log("audio state transcriptStyle after api call 2 #api",transcriptStyle)

      mediaRecorder.current.onstop = async () => { // Added 'async' here
        setAudioState(prev => ({ ...prev, isLoading:true }));
        const blob = new Blob(chunks.current, { type: 'audio/ogg; codecs=opus' });
        console.log("audio state transcriptStyle before api call #api",transcriptStyle)
        const audioTranscription= await submitAudioFileAndGetAudioTranscription(blob); // This will now work correctly
        const proseRes = await GenerateProse(audioTranscription,transcriptStyle); // This will now work correctly
        console.log("audio state transcriptStyle after api call #api",transcriptStyle)
        if(audioTranscription !=="Error" && proseRes !=="Error" ){
          setAudioState(prev => ({
            ...prev, // Spread previous state to ensure a new object is created
            prose: proseRes,
          }));
                    
        }
        else{
          setAudioState(prev => ({ ...prev, isError:"Error" }));
        }
        setAudioState(prev => ({ ...prev, isLoading:false }));


        chunks.current = [];
      };
      

      mediaRecorder.current.start();
      setAudioState(prev => ({ ...prev, isRecording: true, isPaused: false }));

      timerRef.current = window.setInterval(() => {
        setAudioState(prev => ({ ...prev, duration: prev.duration + 1 }));
      }, 1000);
    } catch (error) {
      setAudioState(prev => ({ ...prev, isLoading:true }));
      console.error('Error accessing microphone:', error);
    }
  }, [transcriptStyle]);

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
  function setTranscriptStyle(value:string){
    setAudioState(prev => ({ ...prev, transcriptStyle: value}));

  }
  return {
    audioState,
    setAudioState,
    setTranscriptStyle,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  };
}