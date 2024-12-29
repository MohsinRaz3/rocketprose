import { Mic, PencilLine, Upload } from "lucide-react";

export function SelectTranscriptionTypeButton({ label, onClick, activeTab }: { label: string; onClick: any,activeTab:string }) {
  return (
    <button
      onClick={onClick}
      className={`flex gap-1 justify-center items-center h-[36px] w-[150px]
       ${activeTab===label?"bg-[#1a5d79] text-white":"bg-white text-[#1a5d79]"} text-xs md:text-sm px-4 py-2 rounded-xl font-semibold
        hover:bg-[#1a5d79] hover:text-white transition-all transform shadow-lg`}
    >
      <span className="hidden md:block">{label}</span>

      {label == "Record Audio" && <Mic className="md:hidden size-5" />}
      {label == "Text" &&  <PencilLine  className="md:hidden size-5" />}
     {label == "Upload Audio" &&  <Upload className="md:hidden size-5" />}
     

    </button>
  );
}
