
export function TranscriptionPreview({prose}:{prose:string}) {
  return (
    <div className={`bg-white/10 backdrop-blur rounded-lg shadow-md p-6 border border-white/20 `}>
      <h2 className="text-xl font-semibold text-white mb-4">Transcribed Data ..</h2>
      <div className="border-2  border-gray-400 rounded-lg p-12 text-center transition-colors"
      >
        <p className="mt-2 text-sm md:text-lg text-gray-300">
          {prose}
        </p>
        <p className="text-xs text-gray-500 mt-1">
        </p>
      </div>
    </div>
  );
}