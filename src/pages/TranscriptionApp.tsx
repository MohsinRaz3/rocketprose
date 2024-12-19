import React, { useState } from 'react';
import { AudioRecorder } from '../components/audio/AudioRecorder';
import { FileUpload } from '../components/upload/FileUpload';
import { TranscriptStyleSelector } from '../components/transcript/TranscriptStyleSelector';
import { TranscriptSection } from '../components/transcript/TranscriptSection';
import { TranscriptStyle } from '../types/transcript';
import { TranscriptionState } from '../types';
import { Header } from '../components/layout/Layout.tsx';

export function TranscriptionApp() {
  const [transcriptStyle, setTranscriptStyle] = useState<TranscriptStyle>('Standard Transcript');
  const [transcription, setTranscription] = useState<TranscriptionState>({
    status: 'idle',
    text: '',
  });
    const downloadTranscript = () => {
    if (!transcription.text) return;
   
    const blob = new Blob([transcription.text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  console.log("transcriptStyle #t",transcriptStyle)
  console.log("transcription #t",transcription)
  return (
    <div className="min-h-screen bg-gradient-main">
      <Header />
      <div className="max-w-4xl mx-auto pt-32 pb-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Audio Transcription</h1>
          <p className="text-lg text-white/80">
            Record or upload audio files and get accurate transcriptions in your preferred style
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white/10 backdrop-blur rounded-lg shadow-md p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Record Audio</h2>
            <AudioRecorder transcriptStyle={transcriptStyle} />
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg shadow-md p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Upload Audio File</h2>
            <FileUpload />
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg shadow-md p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Transcription Style</h2>
            <TranscriptStyleSelector
              value={transcriptStyle}
              onChange={setTranscriptStyle}
            />
          </div>

          <TranscriptSection
            status={transcription.status}
            text={transcription.text}
            error={transcription.error}
            onDownload={downloadTranscript}
          />
        </div>
      </div>
    </div>
  );
}