
export function GenrateButton({ isLoading,onClick}: { isLoading: boolean,onClick:any }) {
    return (
      <div className="flex justify-evenly items-end gap-4">
        <p className="text-sm text-white"> Select transcription style to generate content</p>
        <button
        onClick={onClick}
        className="flex gap-1 justify-center items-center h-[36px] w-[90px] mt-6 bg-[#1a5d79] text-sm text-white px-4 py-2 ml-auto rounded-xl font-semibold
         hover:bg-[#337B97] transition-all transform
         shadow-lg">

        {isLoading ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-loader-circle animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
        ) : (
          "Generate"
        )}
      </button>
      </div>
    );
  }
  