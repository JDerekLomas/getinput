export default function PageToolMockup() {
  return (
    <div className="bg-white rounded-lg p-3 h-full overflow-hidden relative">
      {/* Mini page content */}
      <div className="space-y-2">
        {/* Header area */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 rounded bg-[#e7e5e4]" />
          <div className="h-1.5 bg-[#e7e5e4] rounded w-12" />
        </div>

        {/* Headline being edited */}
        <div className="relative">
          <p className="text-[8px] text-[#a8a29e] line-through">
            Embark on Your Journey Today
          </p>

          {/* Edit popover */}
          <div className="absolute -top-1 left-0 right-0 bg-[#1c1917] rounded-md p-1.5 shadow-lg z-10">
            <p className="text-[7px] text-white font-medium mb-1">
              Try free today
            </p>
            <div className="flex justify-end gap-1">
              <span className="text-[5px] px-1 py-0.5 bg-[#b45309] text-white rounded">Save</span>
            </div>
          </div>
        </div>

        {/* Body text placeholders */}
        <div className="space-y-1 mt-6">
          <div className="h-1 bg-[#f5f5f4] rounded w-full" />
          <div className="h-1 bg-[#f5f5f4] rounded w-11/12" />
          <div className="h-1 bg-[#f5f5f4] rounded w-10/12" />
        </div>

        {/* Another editable element */}
        <div className="mt-2 inline-block">
          <span className="text-[6px] px-1.5 py-0.5 bg-[#fef3c7] text-[#b45309] rounded border border-[#b45309]/20">
            Click to edit
          </span>
        </div>

        {/* More placeholders */}
        <div className="space-y-1 mt-2">
          <div className="h-1 bg-[#f5f5f4] rounded w-full" />
          <div className="h-1 bg-[#f5f5f4] rounded w-9/12" />
        </div>
      </div>

      {/* Edit indicator */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-[#b45309] rounded-full" />
        <span className="text-[5px] text-[#a8a29e]">2 edits</span>
      </div>
    </div>
  );
}
