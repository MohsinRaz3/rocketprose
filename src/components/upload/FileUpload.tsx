import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { submitAudioFileAndGetAudioTranscription } from '../apicalling';
import { toast } from 'react-toastify';
import { AudioState } from '../../types';
import { WriteTranscriptionArea } from './WriteTranscription';

export function FileUpload({setAudioState,audioState,transcriptStyle}:{setAudioState:any,audioState:AudioState,transcriptStyle:string}) {

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = async(files: File[]) => {
    // const validTypes = ['audio/mp3', 'audio/wav', 'audio/m4a', 'audio/mpeg'];
    // const validFiles = files.filter(file => validTypes.includes(file.type));
    // if (validFiles.length !== files.length) {
    //   alert('Some files were rejected. Please upload only MP3, WAV, or M4A files.');
    // }
    setAudioState((prev: any) => ({
      ...prev,
      isLoading:true
    }));
    // Handle valid files here
     const audioTranscription = await submitAudioFileAndGetAudioTranscription(files[0], "uploaded");

    if (audioTranscription !== "Error") {
      setAudioState((prev: any) => ({
        ...prev,
        userInputText: audioTranscription,
        isLoading:false
      }));
    } else {
      toast.error('Please upload a valid audio file! (MP3, WAV, M4A) or try again.');
      setAudioState((prev: any) => ({
        ...prev,
        isLoading:false
      }));
    }
  };




  return (
    <>
      
{audioState.userInputText.length >0?(
        <WriteTranscriptionArea transcriptStyle={transcriptStyle} setAudioState={setAudioState}audioState={audioState} />
):(
  <div className="bg-white/10 backdrop-blur rounded-lg shadow-md p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Upload Audio File</h2>

    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className={` ${audioState.isLoading && "animate-pulse pointer-events-none opacity-15"} border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#1a5d79] transition-colors`}
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        Drag and drop your audio files here, or
        <label className="mx-1 text-blue-500 hover:text-blue-600 cursor-pointer">
          browse
          <input
            type="file"
            className="hidden"
            accept=".mp3,.wav,.m4a"
            multiple
            onChange={(e) => handleFiles(Array.from(e.target.files || []))}
          />
        </label>
      </p>
      {/* <p className="text-xs text-gray-500 mt-1">
        Supports MP3, WAV, M4A (max 500MB)
      </p> */}
    </div>
    </div>
)}
          
          </>

  );
}