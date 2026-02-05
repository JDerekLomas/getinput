"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ReviewContent() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get("url");
  const [copied, setCopied] = useState(false);

  // If a URL is provided, generate the share link and offer to copy it
  const shareLink = targetUrl
    ? `${targetUrl}${targetUrl.includes("?") ? "&" : "?"}getinput`
    : null;

  const copyShareLink = async () => {
    if (shareLink) {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-6">
      <div className="max-w-lg text-center">
        <h1 className="font-serif text-3xl font-medium text-[#1c1917] mb-4">
          Share for feedback
        </h1>

        {shareLink ? (
          <>
            <p className="text-[#57534e] mb-6">
              Add <code className="bg-[#f5f5f4] px-1.5 py-0.5 rounded text-sm font-mono">?getinput</code> to
              your URL so others can leave feedback:
            </p>

            <div className="bg-white border border-[#e7e5e4] rounded-lg p-4 mb-4">
              <code className="text-sm text-[#57534e] break-all">{shareLink}</code>
            </div>

            <button
              onClick={copyShareLink}
              className="bg-[#1c1917] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#292524] transition"
            >
              {copied ? "Copied!" : "Copy share link"}
            </button>

            <p className="text-sm text-[#a8a29e] mt-6">
              When visitors open this link, they'll see the feedback widget and can leave comments or suggest edits.
            </p>
          </>
        ) : (
          <>
            <p className="text-[#57534e] mb-6">
              To get feedback on your site, just add <code className="bg-[#f5f5f4] px-1.5 py-0.5 rounded text-sm font-mono">?getinput</code> to any URL:
            </p>

            <div className="bg-white border border-[#e7e5e4] rounded-lg p-4 mb-4 text-left">
              <p className="text-sm text-[#a8a29e] mb-2">Your URL:</p>
              <code className="text-sm text-[#57534e]">https://your-site.com</code>
              <p className="text-sm text-[#a8a29e] mt-4 mb-2">Share this:</p>
              <code className="text-sm text-[#1c1917] font-medium">https://your-site.com<span className="text-[#2563eb]">?getinput</span></code>
            </div>

            <p className="text-sm text-[#a8a29e] mt-6">
              Make sure your site has the InputWidget component installed. See <a href="/" className="text-[#2563eb] hover:underline">setup instructions</a>.
            </p>
          </>
        )}

        <div className="mt-12 pt-8 border-t border-[#e7e5e4]">
          <a
            href="/"
            className="text-[#57534e] hover:text-[#1c1917] text-sm"
          >
            ← Back to getinput
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
          <p className="text-[#57534e]">Loading...</p>
        </div>
      }
    >
      <ReviewContent />
    </Suspense>
  );
}
