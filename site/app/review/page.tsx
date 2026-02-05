"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import InputWidget from "@/components/InputWidget";

function ReviewContent() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-2xl font-medium text-[#1c1917] mb-4">
            No URL provided
          </h1>
          <p className="text-[#57534e] mb-6">
            Add a <code className="bg-[#f5f5f4] px-1.5 py-0.5 rounded text-sm font-mono">?url=</code> parameter to review a site.
          </p>
          <p className="text-sm text-[#a8a29e]">
            Example: <code className="font-mono text-xs">/review?url=https://example.com</code>
          </p>
        </div>
      </div>
    );
  }

  // Validate URL
  let validUrl: URL;
  try {
    validUrl = new URL(targetUrl);
    if (!["http:", "https:"].includes(validUrl.protocol)) {
      throw new Error("Invalid protocol");
    }
  } catch {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-2xl font-medium text-[#1c1917] mb-4">
            Invalid URL
          </h1>
          <p className="text-[#57534e]">
            Please provide a valid http:// or https:// URL.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1c1917] flex flex-col">
      {/* Header bar */}
      <div className="bg-[#292524] border-b border-[#3f3f46] px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <a href="/" className="text-white font-serif font-medium">
            getinput
          </a>
          <span className="text-[#57534e]">/</span>
          <span className="text-[#a8a29e] text-sm truncate max-w-[300px] md:max-w-[500px]">
            {validUrl.hostname}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#a8a29e] hidden sm:inline">
            Click elements to give feedback
          </span>
        </div>
      </div>

      {/* Iframe container */}
      <div className="flex-1 relative">
        <iframe
          src={targetUrl}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          title={`Reviewing ${validUrl.hostname}`}
        />

        {/* Overlay message for cross-origin limitations */}
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80">
          <div className="bg-[#1c1917]/95 backdrop-blur border border-[#3f3f46] rounded-lg p-3 text-sm">
            <p className="text-white font-medium mb-1">Cross-origin note</p>
            <p className="text-[#a8a29e] text-xs leading-relaxed">
              Due to browser security, the feedback widget can't overlay external sites directly.
              For full functionality, add the widget to your own project.
            </p>
          </div>
        </div>
      </div>

      {/* Widget for this page's feedback */}
      <InputWidget
        allowedHosts={["localhost", "getinput.io", "vercel.app"]}
        reviewUrl={targetUrl}
      />
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
        <p className="text-[#57534e]">Loading...</p>
      </div>
    }>
      <ReviewContent />
    </Suspense>
  );
}
