export default function TeamMockup() {
  return (
    <div className="bg-[#fafaf9] rounded-lg p-2 h-full overflow-hidden">
      {/* Share modal */}
      <div className="bg-white rounded-lg border border-[#e7e5e4] p-2 shadow-sm mb-2">
        <p className="text-[6px] font-medium text-[#1c1917] mb-1">Share for review</p>

        {/* URL field */}
        <div className="flex items-center gap-1 bg-[#f5f5f4] rounded p-1 mb-1.5">
          <span className="text-[5px] text-[#57534e] truncate flex-1">
            getinput.io/r/ax7k2m
          </span>
          <span className="text-[4px] px-1 py-0.5 bg-[#1c1917] text-white rounded">
            Copy
          </span>
        </div>

        {/* Avatars showing who has access */}
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <div className="w-3 h-3 rounded-full bg-[#dbeafe] border border-white" />
            <div className="w-3 h-3 rounded-full bg-[#fef3c7] border border-white" />
            <div className="w-3 h-3 rounded-full bg-[#f3e8ff] border border-white" />
          </div>
          <span className="text-[5px] text-[#a8a29e]">3 reviewers</span>
        </div>
      </div>

      {/* Feedback coming in */}
      <div className="space-y-1">
        <div className="flex items-start gap-1 bg-white rounded p-1 border border-[#e7e5e4]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#dbeafe] shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[5px] text-[#1c1917]">Client</p>
            <p className="text-[4px] text-[#57534e] truncate">"Change CTA to Sign up"</p>
          </div>
          <span className="text-[4px] text-[#a8a29e]">2m</span>
        </div>

        <div className="flex items-start gap-1 bg-white rounded p-1 border border-[#e7e5e4]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#fef3c7] shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[5px] text-[#1c1917]">PM</p>
            <p className="text-[4px] text-[#57534e] truncate">"Approved hero image"</p>
          </div>
          <span className="text-[4px] text-[#a8a29e]">5m</span>
        </div>
      </div>

      {/* Status */}
      <div className="mt-2 text-center">
        <span className="text-[5px] text-[#22c55e]">● 2 new responses</span>
      </div>
    </div>
  );
}
