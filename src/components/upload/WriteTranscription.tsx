import { useState } from 'react';
import { AudioState } from '../../types';
import { GenerateProse } from '../apicalling';
import { toast } from 'react-toastify';
export function WriteTranscriptionArea({ setAudioState, audioState,transcriptStyle }: { setAudioState: any, audioState: AudioState,transcriptStyle:string }) {
  const [userText, setUserText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleGenerateTranscription = async () => {
    if (userText.trim() === "") {
      toast.error('Please enter text to transcribe!')
    }
    else {

      setIsLoading(true);
      const proseRes = await GenerateProse({ transcript: userText }, transcriptStyle);

      if (proseRes !== "Error" && proseRes !== "Error") {
        setAudioState((prev: any) => ({
          ...prev,
          prose: proseRes,
        }));
        toast('Text transcribe successfully!', { type: 'success' });
      } else {
        toast.error('Unable to transcribe text, please try again!')
        setIsError(true)
      }

      setIsLoading(false);
    }
  };
  return (
    <div className={`bg-white/10 backdrop-blur rounded-lg shadow-md p-3 md:p-6 border border-white/20`}>
      <h2 className="text-xl font-semibold text-white mb-4">Text Area</h2>
      <div className="grid gap-2 border-2 border-gray-400 bg-white rounded-lg p-3 md:p-6 text-center transition-colors relative">
        <textarea
          className="w-full h-40 rounded-md border border-gray-300 p-2 bg-transparent text-black resize-none focus:outline-none focus:ring-2 focus:ring-[#1a5d79]"
          placeholder="Enter your text here..."
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
        />
        <button
          onClick={handleGenerateTranscription}
          className="flex gap-1 justify-center items-center h-[36px] w-[90px] bg-[#1a5d79] text-sm text-white px-4 py-2 ml-auto rounded-xl font-semibold
           hover:bg-[#337B97] transition-all transform
           shadow-lg">

          {isLoading ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-loader-circle animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
          ) : (
            "Generate"
          )}
        </button>
      </div>

    </div>
  );
}
