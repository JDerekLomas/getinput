"use client";

import { useState } from "react";

interface PickItem {
  id: number;
  status: "pending" | "approved" | "rejected";
  reason?: string;
}

// Sample images for the demo - mix of "good" and "flawed"
const DEMO_IMAGES = [
  { id: 1, label: "Professional headshot", flawed: false },
  { id: 2, label: "Clear background", flawed: false },
  { id: 3, label: "Good lighting", flawed: false },
  { id: 4, label: "Weird artifacts", flawed: true },
  { id: 5, label: "Distorted features", flawed: true },
  { id: 6, label: "Clean composition", flawed: false },
];

export default function PicksDemo() {
  const [picks, setPicks] = useState<PickItem[]>(
    DEMO_IMAGES.map((img) => ({ id: img.id, status: "pending" }))
  );
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = (id: number) => {
    setPicks((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "approved" } : p))
    );
  };

  const handleReject = (id: number, reason: string) => {
    setPicks((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "rejected", reason } : p
      )
    );
    setRejectingId(null);
    setRejectReason("");
  };

  const handleReset = () => {
    setPicks(DEMO_IMAGES.map((img) => ({ id: img.id, status: "pending" })));
  };

  const approved = picks.filter((p) => p.status === "approved");
  const rejected = picks.filter((p) => p.status === "rejected");
  const pending = picks.filter((p) => p.status === "pending");

  const hasApproved = approved.length > 0;
  const hasRejected = rejected.length > 0;
  const currentStep = !hasApproved && !hasRejected ? 1 : !hasRejected ? 2 : 3;

  return (
    <div className="space-y-4">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2 text-xs">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
          currentStep === 1 ? "bg-[#2563eb] text-white" : currentStep > 1 ? "bg-green-100 text-green-700" : "bg-[#f5f5f4] text-[#a8a29e]"
        }`}>
          <span className="font-bold">1</span>
          <span>Hover an image</span>
          {currentStep > 1 && <span>&#10003;</span>}
        </div>
        <div className="w-4 h-px bg-[#e7e5e4]" />
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
          currentStep === 2 ? "bg-[#2563eb] text-white" : currentStep > 2 ? "bg-green-100 text-green-700" : "bg-[#f5f5f4] text-[#a8a29e]"
        }`}>
          <span className="font-bold">2</span>
          <span>Reject with reason</span>
          {currentStep > 2 && <span>&#10003;</span>}
        </div>
        <div className="w-4 h-px bg-[#e7e5e4]" />
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
          currentStep === 3 ? "bg-green-600 text-white" : "bg-[#f5f5f4] text-[#a8a29e]"
        }`}>
          <span className="font-bold">3</span>
          <span>See output</span>
          {hasRejected && <span>&#10003;</span>}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Image grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 text-xs">
              <span className="text-green-600">{approved.length} approved</span>
              <span className="text-red-600">{rejected.length} rejected</span>
              <span className="text-[#a8a29e]">{pending.length} pending</span>
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

          <div className="grid grid-cols-3 gap-3">
            {DEMO_IMAGES.map((img) => {
              const pick = picks.find((p) => p.id === img.id)!;
              const isRejecting = rejectingId === img.id;

              return (
                <div
                  key={img.id}
                  className={`relative aspect-square bg-[#f5f5f4] rounded-lg overflow-hidden border-2 transition ${
                    pick.status === "approved"
                      ? "border-green-500"
                      : pick.status === "rejected"
                      ? "border-red-400 opacity-50"
                      : "border-transparent"
                  }`}
                >
                  {/* Placeholder image representation */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center ${
                      img.flawed
                        ? "bg-gradient-to-br from-[#f5f5f4] to-[#e7e5e4]"
                        : "bg-gradient-to-br from-[#fafaf9] to-[#f5f5f4]"
                    }`}
                  >
                    <div className="text-center p-2">
                      <div
                        className={`text-3xl mb-1 ${
                          img.flawed ? "opacity-50 blur-[1px]" : ""
                        }`}
                      >
                        &#128100;
                      </div>
                      <span className="text-[10px] text-[#a8a29e]">
                        {img.label}
                      </span>
                      {img.flawed && (
                        <div className="absolute top-1 right-1">
                          <span className="text-[8px] bg-red-100 text-red-600 px-1 rounded">
                            AI artifact
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status overlay */}
                  {pick.status !== "pending" && (
                    <div
                      className={`absolute inset-0 flex items-center justify-center ${
                        pick.status === "approved"
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      }`}
                    >
                      <span className="text-2xl">
                        {pick.status === "approved" ? "&#10003;" : "&#10007;"}
                      </span>
                    </div>
                  )}

                  {/* Action buttons for pending */}
                  {pick.status === "pending" && !isRejecting && (
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 hover:opacity-100 bg-white/80 transition">
                      <button
                        onClick={() => handleApprove(img.id)}
                        className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-500 flex items-center justify-center text-white text-lg"
                        title="Approve"
                      >
                        &#10003;
                      </button>
                      <button
                        onClick={() => setRejectingId(img.id)}
                        className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center text-white text-lg"
                        title="Reject"
                      >
                        &#10007;
                      </button>
                    </div>
                  )}

                  {/* Reject reason input */}
                  {isRejecting && (
                    <div className="absolute inset-0 bg-white/95 p-2 flex flex-col">
                      <input
                        type="text"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Reason..."
                        className="flex-1 bg-[#fafaf9] border border-[#e7e5e4] rounded px-2 text-xs text-[#1c1917] placeholder-[#a8a29e]"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleReject(img.id, rejectReason || "No reason given");
                          }
                          if (e.key === "Escape") {
                            setRejectingId(null);
                            setRejectReason("");
                          }
                        }}
                      />
                      <div className="flex gap-1 mt-1">
                        <button
                          onClick={() => {
                            setRejectingId(null);
                            setRejectReason("");
                          }}
                          className="flex-1 text-[10px] py-1 text-[#a8a29e] hover:text-[#57534e]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() =>
                            handleReject(img.id, rejectReason || "No reason given")
                          }
                          className="flex-1 text-[10px] py-1 bg-red-500 rounded text-white"
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
            <p className="text-xs text-[#2563eb] text-center animate-pulse">
              &#8593; Hover over an image to see approve/reject buttons
            </p>
          )}
        </div>

        {/* Picks output */}
        <div className={`bg-[#fafaf9] rounded-xl border p-4 transition ${
          hasRejected ? "border-green-300" : "border-[#e7e5e4]"
        }`}>
          <h4 className="text-sm font-medium text-[#1c1917] mb-3 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${hasRejected ? "bg-green-500" : "bg-[#2563eb]"}`} />
            Picks Output
            {hasRejected && <span className="text-green-600 text-xs ml-auto">Rejection reasons guide regeneration!</span>}
          </h4>
          <pre className="text-xs text-[#57534e] bg-white rounded-lg p-3 overflow-auto max-h-80 font-mono border border-[#e7e5e4]">
            {approved.length === 0 && rejected.length === 0 ? (
              <span className="text-[#a8a29e]">
                {`// Approve good images, reject flawed ones\n// Rejection reasons help Claude fix issues\n\n{\n  "approved": [],\n  "rejected": []\n}`}
              </span>
            ) : (
              JSON.stringify(
                {
                  approved: approved.map((p) => ({
                    id: p.id,
                    image: `generated_${p.id}.png`,
                  })),
                  rejected: rejected.map((p) => ({
                    id: p.id,
                    image: `generated_${p.id}.png`,
                    reason: p.reason,
                  })),
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
