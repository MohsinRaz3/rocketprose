
import { Copy } from 'lucide-react';
import { useState } from 'react';

export function TranscriptionPreview({prose}:{prose:string}) {
  const [copySuccess, setCopySuccess] = useState("");
  
  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch((err) => {
        setCopySuccess("Failed to copy");
      });
  };


  return (
    <div className={`bg-white/10 backdrop-blur rounded-lg shadow-md p-6 border border-white/20 `}>
      <h2 className="text-xl font-semibold text-white mb-4">Transcribed Data ..</h2>
      <div className="border-2  border-gray-400 rounded-lg p-12 text-center transition-colors relative"
      >
              <Copy onClick={() => copyToClipboard(prose)} color='#fff' size={24} className=' size-4 md:size-6 absolute top-0 right-0 m-4 cursor-pointer hover:opacity-60'/>
              {copySuccess && (
                  <span className="absolute -top-6 -right-8 lg:-right-12 md:-top-4 py-1 px-2 text-sm rounded-lg font-semibold text-black bg-white">
                    {copySuccess}
                  </span>
                )}
        <p className="mt-2 text-sm md:text-lg text-gray-300">
          {prose}
        </p>
        <p className="text-xs text-gray-500 mt-1">
        </p>
      </div>
    </div>
  );
}