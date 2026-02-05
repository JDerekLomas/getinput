export default function LoopMockup() {
  return (
    <div className="bg-white rounded-2xl p-6 h-full overflow-hidden">
      <div className="flex items-stretch gap-4 h-full">
        {/* Step 1: Marked up page */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-5 rounded-full bg-[#b45309] text-white text-[10px] flex items-center justify-center font-medium">1</span>
            <p className="text-xs font-medium text-[#1c1917]">Mark it up</p>
          </div>
          <div className="flex-1 bg-[#fafaf9] rounded-xl border border-[#e7e5e4] p-3 relative">
            {/* Mini page with annotations */}
            <div className="space-y-2">
              <div className="h-2 bg-[#1c1917] rounded w-2/3" />

              {/* Highlighted text with X */}
              <div className="relative">
                <div className="h-1.5 bg-[#fecaca] rounded w-full border border-[#ef4444]" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#ef4444] rounded-full text-white text-[6px] flex items-center justify-center">✕</span>
              </div>

              <div className="h-1.5 bg-[#f5f5f4] rounded w-11/12" />
              <div className="h-1.5 bg-[#f5f5f4] rounded w-10/12" />

              {/* Approved element */}
              <div className="relative">
                <div className="h-1.5 bg-[#dcfce7] rounded w-1/3 border border-[#22c55e]" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#22c55e] rounded-full text-white text-[6px] flex items-center justify-center">✓</span>
              </div>
            </div>

            {/* Feedback count */}
            <div className="absolute bottom-2 right-2 text-[8px] text-[#b45309] font-medium">
              3 items
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center">
          <svg className="w-4 h-4 text-[#d6d3d1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Step 2: Terminal */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-5 rounded-full bg-[#1c1917] text-white text-[10px] flex items-center justify-center font-medium">2</span>
            <p className="text-xs font-medium text-[#1c1917]">Tell Claude</p>
          </div>
          <div className="flex-1 bg-[#0a0a0a] rounded-xl p-3 font-mono">
            <div className="flex items-center gap-1 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
              <span className="w-2 h-2 rounded-full bg-[#eab308]" />
              <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            </div>

            <p className="text-[9px] text-[#22c55e] mb-1">$ claude</p>
            <p className="text-[9px] text-white mb-2">&gt; /input apply</p>

            <div className="space-y-1">
              <p className="text-[8px] text-[#a8a29e]">Applying 3 changes...</p>
              <p className="text-[8px] text-[#22c55e]">✓ Updated headline</p>
              <p className="text-[8px] text-[#22c55e]">✓ Fixed CTA text</p>
              <p className="text-[8px] text-[#22c55e]">✓ Removed paragraph</p>
            </div>

            <p className="text-[8px] text-[#a8a29e] mt-2">Done in 1.2s</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center">
          <svg className="w-4 h-4 text-[#d6d3d1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Step 3: Fixed page */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-5 rounded-full bg-[#22c55e] text-white text-[10px] flex items-center justify-center font-medium">3</span>
            <p className="text-xs font-medium text-[#1c1917]">Done</p>
          </div>
          <div className="flex-1 bg-[#fafaf9] rounded-xl border border-[#22c55e]/30 p-3 relative">
            {/* Clean page */}
            <div className="space-y-2">
              <div className="h-2 bg-[#1c1917] rounded w-2/3" />
              <div className="h-1.5 bg-[#1c1917]/60 rounded w-full" />
              <div className="h-1.5 bg-[#f5f5f4] rounded w-11/12" />
              <div className="h-1.5 bg-[#f5f5f4] rounded w-10/12" />
              <div className="h-1.5 bg-[#22c55e] rounded w-1/3" />
            </div>

            {/* Success badge */}
            <div className="absolute bottom-2 right-2 bg-[#dcfce7] text-[#16a34a] text-[7px] px-2 py-0.5 rounded-full font-medium">
              ✓ Updated
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
