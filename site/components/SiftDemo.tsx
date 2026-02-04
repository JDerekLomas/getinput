"use client";

import { useState } from "react";

interface SiftItem {
  id: number;
  text: string;
  status: "pending" | "approved" | "rejected";
  note?: string;
  issue?: string;
}

const DEMO_CONTENT: SiftItem[] = [
  {
    id: 1,
    text: "Our revolutionary paradigm-shifting solution leverages cutting-edge synergies to empower your digital transformation journey.",
    status: "pending",
    issue: "Too much jargon",
  },
  {
    id: 2,
    text: "Save time with automated workflows that handle repetitive tasks.",
    status: "pending",
  },
  {
    id: 3,
    text: "As a distinguished leader in the industry, we humbly invite you to partake in an exclusive opportunity of unprecedented magnitude.",
    status: "pending",
    issue: "Too formal",
  },
  {
    id: 4,
    text: "Connect your tools. Get notified. Ship faster.",
    status: "pending",
  },
  {
    id: 5,
    text: "In conclusion, it can be stated that the aforementioned product delivers substantial value propositions across multiple verticals.",
    status: "pending",
    issue: "Awkward phrasing",
  },
];

export default function SiftDemo() {
  const [items, setItems] = useState<SiftItem[]>(DEMO_CONTENT);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");

  const handleApprove = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "approved" } : item
      )
    );
  };

  const handleReject = (id: number, note: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "rejected", note } : item
      )
    );
    setEditingId(null);
    setNoteText("");
  };

  const handleReset = () => {
    setItems(DEMO_CONTENT);
  };

  const approved = items.filter((i) => i.status === "approved");
  const rejected = items.filter((i) => i.status === "rejected");

  const hasApproved = approved.length > 0;
  const hasRejected = rejected.length > 0;
  const currentStep = !hasApproved && !hasRejected ? 1 : !hasRejected ? 2 : 3;

  return (
    <div className="space-y-4">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2 text-xs">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
          currentStep === 1 ? "bg-[#7c3aed] text-white" : currentStep > 1 ? "bg-green-100 text-green-700" : "bg-[#f5f5f4] text-[#a8a29e]"
        }`}>
          <span className="font-bold">1</span>
          <span>Review content</span>
          {currentStep > 1 && <span>&#10003;</span>}
        </div>
        <div className="w-4 h-px bg-[#e7e5e4]" />
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
          currentStep === 2 ? "bg-[#7c3aed] text-white" : currentStep > 2 ? "bg-green-100 text-green-700" : "bg-[#f5f5f4] text-[#a8a29e]"
        }`}>
          <span className="font-bold">2</span>
          <span>Reject with note</span>
          {currentStep > 2 && <span>&#10003;</span>}
        </div>
        <div className="w-4 h-px bg-[#e7e5e4]" />
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
          currentStep === 3 ? "bg-green-600 text-white" : "bg-[#f5f5f4] text-[#a8a29e]"
        }`}>
          <span className="font-bold">3</span>
          <span>See refinements</span>
          {hasRejected && <span>&#10003;</span>}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Content review list */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 text-xs">
              <span className="text-green-600">{approved.length} approved</span>
              <span className="text-red-600">{rejected.length} rejected</span>
              <span className="text-[#a8a29e]">
                {items.filter((i) => i.status === "pending").length} pending
              </span>
            </div>
            {(approved.length > 0 || rejected.length > 0) && (
              <button
                onClick={handleReset}
                className="text-xs text-[#a8a29e] hover:text-[#57534e]"
              >
                Reset
              </button>
            )}
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {items.map((item) => {
              const isEditing = editingId === item.id;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-lg border p-3 transition ${
                    item.status === "approved"
                      ? "border-green-300 bg-green-50"
                      : item.status === "rejected"
                      ? "border-red-200 bg-red-50"
                      : "border-[#e7e5e4]"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          item.status === "rejected"
                            ? "text-[#a8a29e] line-through"
                            : "text-[#57534e]"
                        }`}
                      >
                        {item.text}
                      </p>
                      {item.issue && item.status === "pending" && (
                        <span className="inline-block mt-1 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                          Potential issue: {item.issue}
                        </span>
                      )}
                      {item.note && (
                        <p className="mt-2 text-xs text-[#7c3aed] italic">
                          Note: "{item.note}"
                        </p>
                      )}
                    </div>

                    {item.status === "pending" && !isEditing && (
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="w-8 h-8 rounded bg-green-100 hover:bg-green-600 text-green-600 hover:text-white flex items-center justify-center text-sm transition"
                          title="Approve"
                        >
                          &#10003;
                        </button>
                        <button
                          onClick={() => setEditingId(item.id)}
                          className="w-8 h-8 rounded bg-red-100 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center text-sm transition"
                          title="Reject with note"
                        >
                          &#10007;
                        </button>
                      </div>
                    )}

                    {item.status !== "pending" && (
                      <div className="flex items-start">
                        <span
                          className={`text-lg ${
                            item.status === "approved"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item.status === "approved" ? "&#10003;" : "&#10007;"}
                        </span>
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <div className="mt-3 pt-3 border-t border-[#e7e5e4]">
                      <input
                        type="text"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Why is this being rejected?"
                        className="w-full bg-[#fafaf9] border border-[#e7e5e4] rounded px-3 py-2 text-sm text-[#1c1917] placeholder-[#a8a29e]"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleReject(item.id, noteText || item.issue || "Needs revision");
                          }
                          if (e.key === "Escape") {
                            setEditingId(null);
                            setNoteText("");
                          }
                        }}
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setNoteText("");
                          }}
                          className="px-3 py-1 text-xs text-[#a8a29e] hover:text-[#57534e]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() =>
                            handleReject(item.id, noteText || item.issue || "Needs revision")
                          }
                          className="px-3 py-1 text-xs bg-red-500 rounded text-white hover:bg-red-400"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!hasApproved && !hasRejected && (
            <p className="text-xs text-[#7c3aed] text-center animate-pulse">
              &#8593; Click the buttons to approve or reject content
            </p>
          )}
        </div>

        {/* Sift output */}
        <div className={`bg-[#fafaf9] rounded-xl border p-4 transition ${
          hasRejected ? "border-green-300" : "border-[#e7e5e4]"
        }`}>
          <h4 className="text-sm font-medium text-[#1c1917] mb-3 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${hasRejected ? "bg-green-500" : "bg-[#7c3aed]"}`} />
            Sift Output
            {hasRejected && <span className="text-green-600 text-xs ml-auto">Notes become prompt refinements!</span>}
          </h4>
          <pre className="text-xs text-[#57534e] bg-white rounded-lg p-3 overflow-auto max-h-80 font-mono border border-[#e7e5e4]">
            {approved.length === 0 && rejected.length === 0 ? (
              <span className="text-[#a8a29e]">
                {`// Approve good content, reject with notes\n// Your notes improve future AI output\n\n{\n  "approved": [],\n  "rejected": [],\n  "refinements": []\n}`}
              </span>
            ) : (
              JSON.stringify(
                {
                  approved: approved.map((i) => ({
                    id: i.id,
                    text: i.text.slice(0, 50) + "...",
                  })),
                  rejected: rejected.map((i) => ({
                    id: i.id,
                    text: i.text.slice(0, 50) + "...",
                    note: i.note,
                  })),
                  refinements: rejected.length > 0
                    ? [
                        "Avoid corporate jargon",
                        "Use conversational tone",
                        "Keep sentences concise",
                      ].slice(0, rejected.length)
                    : [],
                },
                null,
                2
              )
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
