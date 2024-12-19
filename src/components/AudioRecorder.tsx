import React from 'react';
import { Mic, Square, Pause, Play } from 'lucide-react';
import { useAudioRecorder } from '../hooks/useAudioRecorder';

export function AudioRecorder({transcriptStyle}:{transcriptStyle:string}) {
  const { audioState, startRecording, stopRecording, pauseRecording, resumeRecording } = useAudioRecorder(transcriptStyle);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${audioState.isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`} />
          <span className="text-sm font-medium">
            {audioState.isRecording ? 'Recording' : 'Ready'}
          </span>
        </div>
        <span className="text-sm font-mono">{formatTime(audioState.duration)}</span>
      </div>

      <div className="flex justify-center space-x-4">
        {!audioState.isRecording ? (
          <button
            onClick={startRecording}
            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <Mic size={24} />
          </button>
        ) : (
          <>
            <button
              onClick={stopRecording}
              className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
            >
              <Square size={24} />
            </button>
            <button
              onClick={audioState.isPaused ? resumeRecording : pauseRecording}
              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              {audioState.isPaused ? <Play size={24} /> : <Pause size={24} />}
            </button>
          </>
        )}
      </div>

      {audioState.audioUrl && (
        <div className="mt-4">
          <audio src={audioState.audioUrl} controls className="w-full" />
        </div>
      )}
    </div>
  );
}