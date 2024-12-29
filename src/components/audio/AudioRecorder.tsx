import React, { useState } from 'react';
import { Mic, Square, Pause, Play } from 'lucide-react';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import { TranscriptionPreview } from '../upload/TranscriptionPreview';
import { WriteTranscriptionArea } from '../upload/WriteTranscription';
import { SelectTranscriptionTypeButton } from '../SelectTranscriptionTypeButton';
import { FileUpload } from '../upload/FileUpload';
import { GenrateButton } from '../Generate';
import { GenerateProse } from '../apicalling';
import { toast } from 'react-toastify';
import { ActiveTab } from '../../types';

export function Transcription({ transcriptStyle }: { transcriptStyle: string }) {
  const { audioState, setAudioState, resetAudioState, startRecording, stopRecording, pauseRecording, resumeRecording } = useAudioRecorder(transcriptStyle);
  const [isLoading, setIsLoading] = useState(false);


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const [activeTab, setActiveTab] = useState<ActiveTab>("Record Audio")
  async function handleGenerateProseForAudio() {

    if (audioState.initialUserTranscription.trim() === "") {
      toast.error('Please record audio to generate transcription!')
    }
    else {

      setIsLoading(true);
      const proseRes = await GenerateProse(audioState.initialUserTranscription, transcriptStyle);

      if (proseRes !== "Error" && proseRes !== "Error") {
        setAudioState((prev: any) => ({
          ...prev,
          prose: proseRes,
        }));
        toast('Success!', { type: 'success' });
      } else {
        toast.error('Unable to transcribe text, please try again!')
      }

      setIsLoading(false);
    }
  }

  function handleTabSwitch(tab: ActiveTab) {
    resetAudioState()
    setActiveTab(tab)

  }
  return (
    <div className=' space-y-8'>
      <div className='flex justify-center items-center gap-4'>
        <SelectTranscriptionTypeButton label='Record Audio' onClick={() => handleTabSwitch("Record Audio")} activeTab={activeTab} />
        <SelectTranscriptionTypeButton label='Text' onClick={() => handleTabSwitch("Text")} activeTab={activeTab} />
        <SelectTranscriptionTypeButton label='Upload Audio' onClick={() => handleTabSwitch("Upload Audio")} activeTab={activeTab} />
      </div>


      {/* AUDIO RECORDER STARTS */}
      {activeTab === "Record Audio" && (
        <div className="  bg-white/10 backdrop-blur rounded-lg shadow-md p-3 md:p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Record Audio</h2>

          <div className='flex flex-col md:flex-row w-full  justify-start items-center gap-4 '>

            <div className="w-full md:w-[300px] bg-white rounded-lg p-3 md:p-6 shadow-md h-[140px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${audioState.isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`} />
                  <span className="text-sm font-medium">
                    {audioState.isRecording ? 'Recording' : 'Ready'}
                  </span>
                </div>
                <span className="text-sm font-mono">{formatTime(audioState.duration)}</span>
              </div>
              {
                audioState.isLoading ? (
                  <img src="/loader-circle.png" className='h-8 w-8 animate-spin mx-auto' alt="audio loading" />
                ) : (
                  <div className="flex justify-center space-x-4">
                    {!audioState.isRecording ? (
                      <button
                        onClick={startRecording}
                        className="p-3 bg-rocket-500 text-white rounded-full hover:bg-rocket-600 transition-colors"
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
                          className="p-3 bg-rocket-500 text-white rounded-full hover:bg-rocket-600 transition-colors"
                        >
                          {audioState.isPaused ? <Play size={24} /> : <Pause size={24} />}
                        </button>
                      </>
                    )}
                  </div>
                )
              }

              {audioState.audioUrl && (
                <div className="mt-4">
                  <audio src={audioState.audioUrl} controls className="w-full" />
                </div>
              )}
            </div>

            <div className='h-[140px] w-full bg-white rounded-lg p-3 md:p-6  shadow-md'>
              {audioState.initialUserTranscription && audioState.initialUserTranscription.length > 0 ? (audioState.initialUserTranscription) : "Record Audio to get transcription"}
            </div>
          </div>
          <GenrateButton isLoading={isLoading} onClick={handleGenerateProseForAudio} />
        </div>
      )}

      {/* WRITE PREVIEW STARTS */}
      {activeTab === "Text" && (

        <WriteTranscriptionArea transcriptStyle={transcriptStyle} setAudioState={setAudioState} audioState={audioState} />
      )}

      {/* UPLOAD AUDIO STARTS */}
      {activeTab === "Upload Audio" && (

        <FileUpload setAudioState={setAudioState} audioState={audioState} transcriptStyle={transcriptStyle} />

      )}

      {/* TRANSCRIPTION PREVIEW STARTS */}
      {audioState.prose && audioState.prose.length > 0 && (
        <TranscriptionPreview key={audioState.prose} prose={audioState.prose} />
      )}

    </div>
  );
}