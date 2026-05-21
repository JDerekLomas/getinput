"use client";

import { useState } from "react";

export default function CommandBlock({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-[#1c1917] rounded-xl p-5 flex items-center gap-3">
      <code className="text-white font-mono text-sm flex-1 overflow-x-auto whitespace-nowrap">
        {command}
      </code>
      <button
        onClick={onCopy}
        className="shrink-0 text-[#a8a29e] hover:text-white transition px-2 py-1 rounded text-xs font-medium"
        title="Copy to clipboard"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
