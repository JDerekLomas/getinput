export default function HeroMockup() {
  return (
    <div className="bg-[#f5f5f4] rounded-2xl p-4 h-full overflow-hidden">
      <div className="flex gap-4 h-full">
        {/* Before: AI-generated page */}
        <div className="flex-1 flex flex-col">
          <p className="text-[10px] font-medium text-[#a8a29e] mb-2 text-center">AI generates</p>
          <div className="flex-1 bg-white rounded-xl border border-[#e7e5e4] p-4 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-[#e7e5e4]" />
              <div className="h-2 bg-[#e7e5e4] rounded w-16" />
            </div>

            {/* Hero section */}
            <div className="mb-4">
              <div className="h-3 bg-[#1c1917] rounded w-3/4 mb-2" />
              <div className="h-2 bg-[#fef3c7] rounded w-full mb-1" />
              <p className="text-[8px] text-[#b45309] leading-tight">
                "Embark on Your Journey Today!"
              </p>
            </div>

            {/* Body */}
            <div className="space-y-1 mb-3">
              <div className="h-1.5 bg-[#f5f5f4] rounded w-full" />
              <div className="h-1.5 bg-[#f5f5f4] rounded w-11/12" />
              <div className="h-1.5 bg-[#f5f5f4] rounded w-10/12" />
            </div>

            {/* CTA */}
            <div className="inline-block bg-[#dbeafe] rounded px-3 py-1">
              <span className="text-[7px] text-[#2563eb]">Get Started Now</span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center w-8">
          <svg className="w-6 h-6 text-[#b45309]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>

        {/* After: With feedback annotations */}
        <div className="flex-1 flex flex-col">
          <p className="text-[10px] font-medium text-[#b45309] mb-2 text-center">You improve</p>
          <div className="flex-1 bg-white rounded-xl border border-[#b45309]/30 p-4 shadow-sm relative">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-[#e7e5e4]" />
              <div className="h-2 bg-[#e7e5e4] rounded w-16" />
            </div>

            {/* Hero section with edit */}
            <div className="mb-4 relative">
              <div className="h-3 bg-[#1c1917] rounded w-3/4 mb-2" />
              <div className="relative">
                <div className="h-2 bg-[#fef3c7] rounded w-full mb-1 border-2 border-[#b45309]" />
                {/* Edit popover */}
                <div className="absolute -top-6 left-0 bg-[#1c1917] rounded px-2 py-1 shadow-lg">
                  <p className="text-[6px] text-[#a8a29e] line-through">Embark on Your Journey</p>
                  <p className="text-[7px] text-white font-medium">Try free today</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-1 mb-3">
              <div className="h-1.5 bg-[#f5f5f4] rounded w-full" />
              <div className="h-1.5 bg-[#f5f5f4] rounded w-11/12" />
              <div className="h-1.5 bg-[#f5f5f4] rounded w-10/12" />
            </div>

            {/* CTA with checkmark */}
            <div className="inline-block bg-[#dcfce7] rounded px-3 py-1 border border-[#22c55e]/30">
              <span className="text-[7px] text-[#16a34a]">✓ Sign up free</span>
            </div>

            {/* Edit count badge */}
            <div className="absolute top-2 right-2 bg-[#b45309] text-white text-[6px] px-1.5 py-0.5 rounded-full">
              2 edits
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
