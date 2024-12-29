import { useState, useRef, useCallback } from "react";
import RecordRTC from "recordrtc";
import {  submitAudioFileAndGetAudioTranscription } from "../components/apicalling";
import { AudioState } from "../types";


export function useAudioRecorder(transcriptStyle: string) {
  const inititalAudioState: AudioState = {
    isRecording: false,
    isPaused: false,
    duration: 0,
    audioUrl: null,
    initialUserTranscription: "",
    userInputText: "",
    prose: "",
    isError: "",
    isLoading: false,
    transcriptStyle: transcriptStyle || "You are a skilled transcriptionist...",
  }
  const [audioState, setAudioState] = useState<AudioState>(inititalAudioState);

  const recorderRef = useRef<RecordRTC | null>(null);
  const timerRef = useRef<number | null>(null);
 // Function to reset the audio state to its default values
 const resetAudioState = useCallback(() => {
  setAudioState(inititalAudioState);
}, [inititalAudioState]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new RecordRTC(stream, {
        type: "audio",
        mimeType: "audio/ogg", 
      });

      recorderRef.current = recorder;
      recorder.startRecording();

      setAudioState((prev) => ({
        ...prev,
        isRecording: true,
        isPaused: false,
      }));

      timerRef.current = window.setInterval(() => {
        setAudioState((prev) => ({ ...prev, duration: prev.duration + 1 }));
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setAudioState((prev) => ({ ...prev, isError: "Error accessing microphone" }));
    }
  }, []);

  // Stop recording
  const stopRecording = useCallback(async () => {
    if (recorderRef.current) {
      clearInterval(timerRef.current || 0);

      recorderRef.current.stopRecording(async () => {
        const blob = recorderRef.current?.getBlob();

        if (blob) {
          const audioFile = new File([blob], `audio_${Date.now()}.ogg`, {
            type: "audio/ogg",
          });

          setAudioState((prev) => ({ ...prev, isLoading: true }));

          try {
            const audioTranscription = await submitAudioFileAndGetAudioTranscription(audioFile,"recorded");

            if (audioTranscription !== "Error") {
              setAudioState((prev) => ({
                ...prev,
                initialUserTranscription: audioTranscription,
              }));
            } else {
              setAudioState((prev) => ({
                ...prev,
                isError: "Error in processing audio",
              }));
            }
          } catch (error) {
            console.error("Error processing audio:", error);
            setAudioState((prev) => ({ ...prev, isError: "Error processing audio" }));
          }

          setAudioState((prev) => ({ ...prev, isLoading: false }));
        }

        setAudioState((prev) => ({
          ...prev,
          isRecording: false,
        }));

        recorderRef.current?.destroy();
        recorderRef.current = null;
      });
    }
  }, [transcriptStyle]);

  // Pause recording
  const pauseRecording = useCallback(() => {
    if (recorderRef.current) {
      recorderRef.current.pauseRecording();
      clearInterval(timerRef.current || 0);

      setAudioState((prev) => ({
        ...prev,
        isPaused: true,
      }));
    }
  }, []);

  // Resume recording
  const resumeRecording = useCallback(() => {
    if (recorderRef.current) {
      recorderRef.current.resumeRecording();

      timerRef.current = window.setInterval(() => {
        setAudioState((prev) => ({ ...prev, duration: prev.duration + 1 }));
      }, 1000);

      setAudioState((prev) => ({
        ...prev,
        isPaused: false,
      }));
    }
  }, []);

  // Update transcriptStyle
  const setTranscriptStyle = (value: string) => {
    setAudioState((prev) => ({ ...prev, transcriptStyle: value }));
  };

  return {
    audioState,
    setAudioState,
    setTranscriptStyle,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetAudioState
  };
}
