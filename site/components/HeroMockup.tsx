export default function HeroMockup() {
  return (
    <div className="bg-[#f5f5f4] rounded-2xl p-6 md:p-10 h-full flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
        {/* 1. Edit in browser */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-[#a8a29e] uppercase tracking-wide">
            1 — Click any text, edit it
          </p>
          <div className="bg-white rounded-xl border border-[#e7e5e4] shadow-sm overflow-hidden">
            <div className="flex gap-1.5 px-4 py-3 border-b border-[#f5f5f4]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fca5a5]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#fcd34d]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#86efac]" />
            </div>
            <div className="px-5 py-7 md:py-10 relative">
              <h3 className="text-[#1c1917] font-serif font-medium text-lg md:text-2xl leading-tight">
                <span className="bg-[#fef3c7] outline outline-2 outline-[#b45309] outline-offset-2 rounded px-1">
                  Try free today
                </span>
              </h3>
              <div className="absolute left-5 right-5 bottom-3 md:bottom-5">
                <div className="bg-[#1c1917] text-white rounded-lg px-3 py-2 shadow-lg inline-block">
                  <p className="text-[10px] md:text-xs text-[#a8a29e] line-through">
                    Embark on Your Journey
                  </p>
                  <p className="text-xs md:text-sm font-medium">Try free today</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Apply with Claude */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-[#b45309] uppercase tracking-wide">
            2 — Claude applies it to your source
          </p>
          <div className="bg-[#0a0a0a] rounded-xl shadow-sm overflow-hidden">
            <div className="flex gap-1.5 px-4 py-3 border-b border-[#1c1917]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fca5a5]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#fcd34d]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#86efac]" />
            </div>
            <div className="px-5 py-5 md:py-6 font-mono space-y-1.5">
              <p className="text-[#86efac] text-xs md:text-sm">
                <span className="text-[#57534e]">{'> '}</span>/input apply
              </p>
              <p className="text-[#a8a29e] text-[11px] md:text-xs">Reading input.json…</p>
              <p className="text-[#86efac] text-[11px] md:text-xs">✓ Updated page.tsx:14</p>
              <p className="text-[#57534e] text-[11px] md:text-xs pt-1">Done in 0.8s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
