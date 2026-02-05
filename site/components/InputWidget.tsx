"use client";

import { useState, useEffect, useRef } from "react";

type Mode = "idle" | "editing" | "commenting" | "viewing";

interface TextEdit {
  type: "text-edit";
  selector: string;
  path: string;
  original: string;
  edited: string;
  timestamp: string;
}

interface Comment {
  type: "comment";
  selector: string;
  path: string;
  elementText: string;
  comment: string;
  timestamp: string;
}

type InputItem = TextEdit | Comment;

function getSelector(el: Element): string {
  const path: string[] = [];
  let current: Element | null = el;

  while (current && current !== document.body) {
    let selector = current.tagName.toLowerCase();
    if (current.id) {
      selector = `#${current.id}`;
      path.unshift(selector);
      break;
    }
    if (current.className && typeof current.className === "string") {
      const classes = current.className
        .split(" ")
        .filter((c) => c && !c.startsWith("__"))
        .slice(0, 2)
        .join(".");
      if (classes) selector += `.${classes}`;
    }
    path.unshift(selector);
    current = current.parentElement;
  }

  return path.join(" > ");
}

function isTextElement(el: Element): boolean {
  const textTags = [
    "P",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "SPAN",
    "A",
    "LI",
    "TD",
    "TH",
    "LABEL",
    "BUTTON",
  ];
  if (!textTags.includes(el.tagName)) return false;

  const text = el.textContent?.trim() || "";
  const childElements = el.querySelectorAll("*").length;
  return text.length > 0 && text.length < 500 && childElements < 5;
}

interface InputWidgetProps {
  /** API endpoint for saving feedback. Defaults to "/api/input" */
  apiEndpoint?: string;
  /** Only show on these hostnames. Defaults to ["localhost"] */
  allowedHosts?: string[];
  /** URL being reviewed (for sharing with others) - can also be set via ?getinput URL param */
  reviewUrl?: string;
}

export default function InputWidget({
  apiEndpoint = "/api/input",
  allowedHosts = ["localhost"],
  reviewUrl: reviewUrlProp,
}: InputWidgetProps = {}) {
  const [mode, setMode] = useState<Mode>("idle");
  const [isVisible, setIsVisible] = useState(false);
  const [isShareMode, setIsShareMode] = useState(false);
  const [reviewUrl, setReviewUrl] = useState<string | undefined>(reviewUrlProp);
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [originalText, setOriginalText] = useState("");
  const [comment, setComment] = useState("");
  const [inputCount, setInputCount] = useState(0);
  const [feedbackItems, setFeedbackItems] = useState<InputItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Saved!");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const host = window.location.hostname;
    const params = new URLSearchParams(window.location.search);

    // Share mode: ?getinput param is present (any value or empty)
    const shareMode = params.has("getinput");
    setIsShareMode(shareMode);

    // Calculate the review URL
    let targetUrl = reviewUrlProp;
    if (shareMode && !reviewUrlProp) {
      // Use the clean URL (without getinput param) as the review URL
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete("getinput");
      targetUrl = cleanUrl.toString();
    }
    setReviewUrl(targetUrl);

    // Visible if: allowed host OR share mode is active
    const visible = allowedHosts.some((h) => host.includes(h)) || shareMode;
    setIsVisible(visible);

    if (visible) {
      loadFeedback(targetUrl, shareMode);
      // Check if user has seen onboarding (show extra welcome in share mode)
      const hasSeenOnboarding = localStorage.getItem("getinput-onboarding-seen");
      if (!hasSeenOnboarding || shareMode) {
        setShowOnboarding(true);
      }
    }
  }, [allowedHosts, reviewUrlProp]);

  const dismissOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("getinput-onboarding-seen", "true");
  };

  const handleFirstAction = () => {
    if (showOnboarding) {
      dismissOnboarding();
    }
  };

  const loadFeedback = async (targetUrl?: string, isShare?: boolean) => {
    // In share mode, don't load from API - feedback is local only
    if (isShare) return;

    try {
      const urlToUse = targetUrl || reviewUrl;
      const endpoint = urlToUse
        ? `${apiEndpoint}?url=${encodeURIComponent(urlToUse)}`
        : apiEndpoint;
      const res = await fetch(endpoint);
      if (res.ok) {
        const data = await res.json();
        setFeedbackItems(data);
        setInputCount(data.length);
      }
    } catch (e) {
      // No input yet
    }
  };

  const showToastWithMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const saveInput = async (item: InputItem) => {
    // In share mode, just store locally - visitor will copy and send
    if (!isShareMode) {
      const url = reviewUrl
        ? `${apiEndpoint}?url=${encodeURIComponent(reviewUrl)}`
        : apiEndpoint;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
    }
    setFeedbackItems((prev) => [...prev, item]);
    setInputCount((c) => c + 1);
    showToastWithMessage(isShareMode ? "Added!" : "Saved!");
  };

  const copyFeedback = async () => {
    const json = JSON.stringify(feedbackItems, null, 2);
    await navigator.clipboard.writeText(json);
    showToastWithMessage("Copied to clipboard!");
  };

  const shareReviewUrl = async () => {
    // Generate a share URL by adding ?getinput to the current page
    const baseUrl = reviewUrl || window.location.href;
    const url = new URL(baseUrl);
    url.searchParams.set("getinput", "");
    // Clean up the URL (remove empty = sign)
    const shareUrl = url.toString().replace("getinput=&", "getinput&").replace("getinput=", "getinput");
    await navigator.clipboard.writeText(shareUrl);
    showToastWithMessage("Share link copied!");
  };

  const handlePageClick = (e: MouseEvent) => {
    if (mode === "idle" || mode === "viewing") return;

    const widget = document.getElementById("input-widget");
    if (widget?.contains(e.target as Node)) return;

    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLElement;

    if (mode === "editing" && isTextElement(target)) {
      setActiveElement(target);
      setOriginalText(target.textContent || "");
      target.contentEditable = "true";
      target.style.outline = "2px solid #b45309";
      target.style.outlineOffset = "2px";
      target.focus();

      const handleBlur = () => {
        target.contentEditable = "false";
        target.style.outline = "";
        target.style.outlineOffset = "";

        const newText = target.textContent || "";
        if (newText !== originalText) {
          saveInput({
            type: "text-edit",
            selector: getSelector(target),
            path: window.location.pathname,
            original: originalText,
            edited: newText,
            timestamp: new Date().toISOString(),
          });
        }

        setActiveElement(null);
        setMode("idle");
        target.removeEventListener("blur", handleBlur);
      };

      target.addEventListener("blur", handleBlur);
    } else if (mode === "commenting") {
      setActiveElement(target);
      target.style.outline = "2px solid #2563eb";
      target.style.outlineOffset = "2px";
      setComment("");
      setTimeout(() => commentInputRef.current?.focus(), 50);
    }
  };

  useEffect(() => {
    if (mode === "editing" || mode === "commenting") {
      document.addEventListener("click", handlePageClick, true);
      document.body.style.cursor = mode === "editing" ? "text" : "crosshair";
    } else {
      document.body.style.cursor = "";
    }

    return () => {
      document.removeEventListener("click", handlePageClick, true);
      document.body.style.cursor = "";
    };
  }, [mode, originalText]);

  const submitComment = () => {
    if (!activeElement || !comment.trim()) return;

    saveInput({
      type: "comment",
      selector: getSelector(activeElement),
      path: window.location.pathname,
      elementText: activeElement.textContent?.slice(0, 100) || "",
      comment: comment.trim(),
      timestamp: new Date().toISOString(),
    });

    activeElement.style.outline = "";
    activeElement.style.outlineOffset = "";
    setActiveElement(null);
    setComment("");
    setMode("idle");
  };

  const cancelComment = () => {
    if (activeElement) {
      activeElement.style.outline = "";
      activeElement.style.outlineOffset = "";
    }
    setActiveElement(null);
    setComment("");
    setMode("idle");
  };

  if (!isVisible) return null;

  return (
    <div
      id="input-widget"
      className="fixed bottom-4 right-4 z-[9999] font-sans"
    >
      {showToast && (
        <div className="absolute bottom-16 right-0 rounded-lg bg-green-600 px-3 py-2 text-sm text-white shadow-lg">
          {toastMessage}
        </div>
      )}

      {/* Onboarding tooltip */}
      {showOnboarding && mode === "idle" && !activeElement && (
        <div className="absolute bottom-14 right-0 w-64 rounded-lg bg-white p-3 shadow-xl border border-[#e7e5e4]">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-[#b45309] text-lg">&#9998;</span>
            <div>
              <p className="text-sm font-medium text-[#1c1917]">
                {isShareMode ? "You've been invited to review" : "Leave feedback on this page"}
              </p>
              <p className="text-xs text-[#57534e] mt-1">
                {isShareMode ? (
                  <>Click <strong>Edit</strong> to suggest text changes, or <strong>Comment</strong> to leave notes. The site owner will see your feedback.</>
                ) : (
                  <>Click <strong>Edit</strong> to fix text directly, or <strong>Comment</strong> to leave notes. Your feedback syncs with Claude Code.</>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={dismissOnboarding}
            className="w-full mt-2 text-xs text-[#a8a29e] hover:text-[#57534e] py-1"
          >
            Got it
          </button>
          {/* Arrow pointing down */}
          <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
        </div>
      )}

      {mode === "idle" && !activeElement && (
        <div className="flex gap-2">
          <button
            onClick={() => {
              handleFirstAction();
              setMode("editing");
            }}
            className={`flex items-center gap-2 rounded-full bg-[#b45309] px-4 py-2 text-sm font-medium text-white shadow-lg hover:opacity-90 ${
              showOnboarding ? "animate-pulse ring-2 ring-[#b45309]/50 ring-offset-2" : ""
            }`}
            title="Click text to edit it directly"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => {
              handleFirstAction();
              setMode("commenting");
            }}
            className={`flex items-center gap-2 rounded-full bg-[#2563eb] px-4 py-2 text-sm font-medium text-white shadow-lg hover:opacity-90 ${
              showOnboarding ? "animate-pulse" : ""
            }`}
            title="Click any element to leave a comment"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Comment
          </button>
          {inputCount > 0 && (
            <button
              onClick={() => setMode("viewing")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f4] text-xs text-[#57534e] hover:bg-[#e7e5e4] transition border border-[#e7e5e4]"
              title="View feedback"
            >
              {inputCount}
            </button>
          )}
        </div>
      )}

      {(mode === "editing" || mode === "commenting") && !activeElement && (
        <div className="rounded-lg bg-white p-4 shadow-xl border border-[#e7e5e4]">
          <p className="mb-2 text-sm text-[#1c1917]">
            {mode === "editing"
              ? "Click any text to edit it directly"
              : "Click any element to leave a comment"}
          </p>
          <button
            onClick={() => setMode("idle")}
            className="text-sm text-[#a8a29e] hover:text-[#57534e]"
          >
            Cancel
          </button>
        </div>
      )}

      {mode === "commenting" && activeElement && (
        <div className="w-72 rounded-lg bg-white p-4 shadow-xl border border-[#e7e5e4]">
          <p className="mb-2 truncate text-xs text-[#a8a29e]">
            {activeElement.textContent?.slice(0, 50) ||
              getSelector(activeElement)}
          </p>
          <textarea
            ref={commentInputRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What should change?"
            className="mb-3 w-full rounded border border-[#e7e5e4] bg-[#fafaf9] p-2 text-sm text-[#1c1917] placeholder-[#a8a29e] focus:border-[#2563eb] focus:outline-none"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submitComment();
              }
              if (e.key === "Escape") cancelComment();
            }}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={cancelComment}
              className="rounded px-3 py-1.5 text-sm text-[#a8a29e] hover:text-[#57534e]"
            >
              Cancel
            </button>
            <button
              onClick={submitComment}
              disabled={!comment.trim()}
              className="rounded bg-[#2563eb] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* View feedback panel */}
      {mode === "viewing" && (
        <div className="w-80 rounded-lg bg-white p-4 shadow-xl border border-[#e7e5e4]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[#1c1917]">
              Feedback ({feedbackItems.length})
            </h3>
            <button
              onClick={() => setMode("idle")}
              className="text-[#a8a29e] hover:text-[#57534e]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {feedbackItems.length === 0 ? (
            <p className="text-sm text-[#a8a29e] py-4 text-center">
              {isShareMode
                ? "Leave some feedback, then copy and send it back."
                : "No feedback yet. Use Edit or Comment to add some."}
            </p>
          ) : (
            <>
              <div className="max-h-60 overflow-y-auto mb-3 space-y-2">
                {feedbackItems.map((item, i) => (
                  <div key={i} className="bg-[#fafaf9] rounded-lg p-2 text-xs border border-[#e7e5e4]">
                    {item.type === "text-edit" ? (
                      <>
                        <span className="text-[#b45309] font-medium">Edit:</span>
                        <p className="text-[#a8a29e] line-through">{item.original.slice(0, 50)}...</p>
                        <p className="text-[#57534e]">{item.edited.slice(0, 50)}...</p>
                      </>
                    ) : (
                      <>
                        <span className="text-[#2563eb] font-medium">Comment:</span>
                        <p className="text-[#57534e]">{item.comment}</p>
                        <p className="text-[#a8a29e] text-[10px] mt-1">on: {item.elementText.slice(0, 30)}...</p>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {isShareMode ? (
                <>
                  <button
                    onClick={copyFeedback}
                    className="w-full flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg py-2.5 text-sm font-medium transition"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy feedback to send
                  </button>
                  <p className="text-[10px] text-[#a8a29e] text-center mt-2">
                    Paste this into Slack, email, or wherever you communicate
                  </p>
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    <button
                      onClick={copyFeedback}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#1c1917] hover:bg-[#292524] text-white rounded-lg py-2 text-sm font-medium transition"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy JSON
                    </button>
                    <button
                      onClick={shareReviewUrl}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg py-2 text-sm font-medium transition"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16,6 12,2 8,6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                      </svg>
                      Share
                    </button>
                  </div>
                  <p className="text-[10px] text-[#a8a29e] text-center mt-2">
                    Copy JSON for Claude Code, or share link with others
                  </p>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
