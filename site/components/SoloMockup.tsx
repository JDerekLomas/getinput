export default function SoloMockup() {
  return (
    <div className="bg-[#1c1917] rounded-lg p-2 h-full overflow-hidden flex flex-col">
      {/* Browser chrome */}
      <div className="flex items-center gap-1 mb-2">
        <div className="flex gap-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#eab308]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
        </div>
        <div className="flex-1 bg-[#292524] rounded h-2 mx-1 flex items-center px-1">
          <span className="text-[4px] text-[#a8a29e]">localhost:3000</span>
        </div>
      </div>

      {/* Split view: page + terminal */}
      <div className="flex-1 flex gap-1">
        {/* Page being reviewed */}
        <div className="flex-1 bg-white rounded overflow-hidden p-1">
          {/* Mini page content */}
          <div className="h-1.5 bg-[#f5f5f4] rounded w-8 mb-1" />
          <div className="space-y-0.5">
            <div className="h-1 bg-[#fef3c7] rounded w-full" />
            <div className="h-0.5 bg-[#f5f5f4] rounded w-10/12" />
            <div className="h-0.5 bg-[#f5f5f4] rounded w-11/12" />
          </div>
          {/* Edit indicator */}
          <div className="mt-1 w-2 h-2 rounded bg-[#b45309]/20 border border-[#b45309]" />
        </div>

        {/* Terminal */}
        <div className="w-[45%] bg-[#0a0a0a] rounded p-1 font-mono">
          <p className="text-[4px] text-[#22c55e] mb-0.5">$ claude</p>
          <p className="text-[4px] text-[#a8a29e]">&gt; /input check</p>
          <div className="mt-1 space-y-0.5">
            <p className="text-[3px] text-[#57534e]">Found 2 edits:</p>
            <p className="text-[3px] text-[#fef3c7]">• headline changed</p>
            <p className="text-[3px] text-[#fef3c7]">• CTA updated</p>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-1.5 text-center">
        <span className="text-[5px] text-[#a8a29e]">You review → Claude applies</span>
      </div>
    </div>
  );
}
