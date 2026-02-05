export default function PicksToolMockup() {
  return (
    <div className="bg-[#f5f5f4] rounded-lg p-3 h-full overflow-hidden flex flex-col items-center justify-center">
      {/* Card stack */}
      <div className="relative w-full max-w-[80px] aspect-[3/4]">
        {/* Back cards */}
        <div className="absolute inset-0 bg-[#e7e5e4] rounded-lg transform translate-x-2 translate-y-2" />
        <div className="absolute inset-0 bg-[#d6d3d1] rounded-lg transform translate-x-1 translate-y-1" />

        {/* Front card - "image" */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#dbeafe] to-[#bfdbfe] rounded-lg shadow-sm overflow-hidden">
          {/* Fake headshot placeholder */}
          <div className="absolute inset-2 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#93c5fd]" />
          </div>

          {/* Swipe indicator */}
          <div className="absolute top-1 right-1 bg-red-500/80 text-white text-[5px] px-1 py-0.5 rounded transform rotate-12">
            REJECT
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 mt-3">
        <button className="w-6 h-6 rounded-full bg-white border border-[#e7e5e4] flex items-center justify-center shadow-sm">
          <span className="text-red-500 text-[10px]">✕</span>
        </button>
        <button className="w-6 h-6 rounded-full bg-white border border-[#e7e5e4] flex items-center justify-center shadow-sm">
          <span className="text-green-500 text-[10px]">✓</span>
        </button>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-1 mt-2">
        <span className="text-[6px] text-[#57534e]">3 of 12</span>
      </div>
    </div>
  );
}
