export default function HeroMockup() {
  return (
    <div className="bg-[#f5f5f4] rounded-2xl p-5 md:p-8 h-full overflow-hidden">
      <div className="grid grid-cols-2 gap-4 md:gap-8 h-full items-stretch">
        {/* Before: AI-generated page */}
        <div className="flex flex-col">
          <p className="text-[10px] md:text-xs font-medium text-[#a8a29e] mb-2 md:mb-3 text-center uppercase tracking-wide">
            AI generates
          </p>
          <div className="flex-1 bg-white rounded-xl border border-[#e7e5e4] p-4 md:p-6 shadow-sm flex flex-col">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-[#f5f5f4]">
              <span className="w-2 h-2 rounded-full bg-[#fca5a5]" />
              <span className="w-2 h-2 rounded-full bg-[#fcd34d]" />
              <span className="w-2 h-2 rounded-full bg-[#86efac]" />
            </div>

            {/* Real content */}
            <h3 className="text-[#1c1917] font-serif font-medium text-base md:text-xl leading-tight mb-2 md:mb-3">
              Embark on Your Journey&nbsp;Today
            </h3>
            <p className="text-[#57534e] text-[10px] md:text-xs leading-relaxed mb-4 md:mb-6">
              Unlock the next generation of productivity solutions designed
              to empower your team's potential.
            </p>
            <div className="mt-auto">
              <span className="inline-block bg-[#2563eb] text-white text-[10px] md:text-xs font-medium rounded-md px-3 py-1.5 md:px-4 md:py-2">
                Get Started Now →
              </span>
            </div>
          </div>
        </div>

        {/* After: With feedback annotations */}
        <div className="flex flex-col">
          <p className="text-[10px] md:text-xs font-medium text-[#b45309] mb-2 md:mb-3 text-center uppercase tracking-wide">
            You fix it
          </p>
          <div className="flex-1 bg-white rounded-xl border-2 border-[#b45309]/40 p-4 md:p-6 shadow-sm flex flex-col relative">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-[#f5f5f4]">
              <span className="w-2 h-2 rounded-full bg-[#fca5a5]" />
              <span className="w-2 h-2 rounded-full bg-[#fcd34d]" />
              <span className="w-2 h-2 rounded-full bg-[#86efac]" />
            </div>

            {/* Headline with strikethrough overlay */}
            <div className="relative mb-2 md:mb-3">
              <h3 className="text-[#1c1917] font-serif font-medium text-base md:text-xl leading-tight">
                <span className="line-through text-[#a8a29e] decoration-[#b45309] decoration-2">
                  Embark on Your Journey
                </span>{" "}
                <span className="bg-[#fef3c7] px-1 rounded">Try free today</span>
              </h3>
            </div>

            <p className="text-[#57534e] text-[10px] md:text-xs leading-relaxed mb-4 md:mb-6">
              Unlock the next generation of productivity solutions designed
              to empower your team's potential.
            </p>

            <div className="mt-auto">
              <span className="inline-block bg-[#16a34a] text-white text-[10px] md:text-xs font-medium rounded-md px-3 py-1.5 md:px-4 md:py-2">
                ✓ Sign up free
              </span>
            </div>

            {/* Edit count badge */}
            <div className="absolute -top-2 -right-2 bg-[#b45309] text-white text-[9px] md:text-[10px] font-medium px-2 py-0.5 rounded-full shadow">
              2 edits
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
