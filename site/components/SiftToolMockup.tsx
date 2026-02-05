export default function SiftToolMockup() {
  const items = [
    { status: "approved", preview: "Premium wireless headphones with..." },
    { status: "rejected", preview: "Experience the revolutionary..." },
    { status: "approved", preview: "Ergonomic design meets crystal..." },
    { status: "pending", preview: "Industry-leading battery life..." },
  ];

  return (
    <div className="bg-[#fafaf9] rounded-lg p-2 h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[7px] font-medium text-[#1c1917]">Product Descriptions</span>
        <span className="text-[6px] text-[#a8a29e]">4 items</span>
      </div>

      {/* Items list */}
      <div className="space-y-1">
        {items.map((item, i) => (
          <div
            key={i}
            className={`bg-white rounded-md p-1.5 border flex items-start gap-1.5 ${
              item.status === "rejected"
                ? "border-red-200 bg-red-50/50"
                : item.status === "approved"
                ? "border-green-200 bg-green-50/50"
                : "border-[#e7e5e4]"
            }`}
          >
            {/* Status indicator */}
            <div className="shrink-0 mt-0.5">
              {item.status === "approved" && (
                <span className="text-[8px] text-green-600">✓</span>
              )}
              {item.status === "rejected" && (
                <span className="text-[8px] text-red-500">✕</span>
              )}
              {item.status === "pending" && (
                <span className="w-2 h-2 rounded-full border border-[#d6d3d1] block" />
              )}
            </div>

            {/* Content preview */}
            <p className={`text-[6px] leading-tight flex-1 ${
              item.status === "rejected" ? "text-[#a8a29e] line-through" : "text-[#57534e]"
            }`}>
              {item.preview}
            </p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-2 flex justify-center gap-2">
        <span className="text-[5px] text-green-600">2 approved</span>
        <span className="text-[5px] text-red-500">1 rejected</span>
        <span className="text-[5px] text-[#a8a29e]">1 pending</span>
      </div>
    </div>
  );
}
