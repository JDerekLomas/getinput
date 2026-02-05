export default function CommunityFeedMockup() {
  const posts = [
    {
      title: "SaaS Landing Page",
      author: "sarah_designs",
      time: "2h",
      feedback: 8,
      status: "reviewing",
      color: "#fef3c7",
    },
    {
      title: "Product Hero Images",
      author: "mike.creative",
      time: "5h",
      feedback: 12,
      status: "complete",
      color: "#dbeafe",
    },
    {
      title: "Email Templates",
      author: "designerjay",
      time: "1d",
      feedback: 5,
      status: "reviewing",
      color: "#f3e8ff",
    },
  ];

  return (
    <div className="bg-[#fafaf9] rounded-lg p-2 h-full overflow-hidden">
      {/* Mini header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[8px] font-medium text-[#1c1917]">Feed</span>
        <div className="flex gap-1">
          <span className="text-[6px] px-1.5 py-0.5 bg-[#1c1917] text-white rounded">New</span>
          <span className="text-[6px] px-1.5 py-0.5 text-[#57534e]">Top</span>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-1.5">
        {posts.map((post, i) => (
          <div
            key={i}
            className="bg-white rounded-md p-2 border border-[#e7e5e4] flex gap-2"
          >
            {/* Thumbnail */}
            <div
              className="w-8 h-8 rounded shrink-0"
              style={{ backgroundColor: post.color }}
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-[7px] font-medium text-[#1c1917] truncate">
                {post.title}
              </p>
              <p className="text-[6px] text-[#a8a29e]">
                @{post.author} · {post.time}
              </p>
            </div>

            {/* Stats */}
            <div className="text-right shrink-0">
              <p className="text-[7px] font-medium text-[#1c1917]">{post.feedback}</p>
              <p className="text-[5px] text-[#a8a29e]">feedback</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mini CTA */}
      <div className="mt-2 text-center">
        <span className="text-[6px] text-[#b45309]">Post your design →</span>
      </div>
    </div>
  );
}
