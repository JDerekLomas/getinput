"use client";

import { useState, useEffect, useRef } from "react";

type Mode = "idle" | "editing" | "commenting";

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
}

export default function InputWidget({
  apiEndpoint = "/api/input",
  allowedHosts = ["localhost"],
}: InputWidgetProps = {}) {
  const [mode, setMode] = useState<Mode>("idle");
  const [isVisible, setIsVisible] = useState(false);
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [originalText, setOriginalText] = useState("");
  const [comment, setComment] = useState("");
  const [inputCount, setInputCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const host = window.location.hostname;
    const visible = allowedHosts.some((h) => host.includes(h));
    setIsVisible(visible);

    if (visible) {
      loadInputCount();
      // Check if user has seen onboarding
      const hasSeenOnboarding = localStorage.getItem("getinput-onboarding-seen");
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, [allowedHosts]);

  const dismissOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("getinput-onboarding-seen", "true");
  };

  const handleFirstAction = () => {
    if (showOnboarding) {
      dismissOnboarding();
    }
  };

  const loadInputCount = async () => {
    try {
      const res = await fetch(apiEndpoint);
      if (res.ok) {
        const data = await res.json();
        setInputCount(data.length);
      }
    } catch (e) {
      // No input yet
    }
  };

  const saveInput = async (item: InputItem) => {
    await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    setInputCount((c) => c + 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handlePageClick = (e: MouseEvent) => {
    if (mode === "idle") return;

    const widget = document.getElementById("input-widget");
    if (widget?.contains(e.target as Node)) return;

    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLElement;

    if (mode === "editing" && isTextElement(target)) {
      setActiveElement(target);
      setOriginalText(target.textContent || "");
      target.contentEditable = "true";
      target.style.outline = "2px solid #f59e0b";
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
      target.style.outline = "2px solid #3b82f6";
      target.style.outlineOffset = "2px";
      setComment("");
      setTimeout(() => commentInputRef.current?.focus(), 50);
    }
  };

  useEffect(() => {
    if (mode !== "idle") {
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
        <div className="absolute bottom-16 right-0 rounded bg-green-600 px-3 py-2 text-sm text-white shadow-lg">
          Saved!
        </div>
      )}

      {/* Onboarding tooltip */}
      {showOnboarding && mode === "idle" && !activeElement && (
        <div className="absolute bottom-14 right-0 w-64 rounded-lg bg-gray-800 p-3 shadow-xl border border-gray-700">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-amber-400 text-lg">&#9998;</span>
            <div>
              <p className="text-sm font-medium text-white">Leave feedback on this page</p>
              <p className="text-xs text-gray-400 mt-1">
                Click <strong>Edit</strong> to fix text directly, or <strong>Comment</strong> to leave notes. Your feedback syncs with Claude Code.
              </p>
            </div>
          </div>
          <button
            onClick={dismissOnboarding}
            className="w-full mt-2 text-xs text-gray-400 hover:text-white py-1"
          >
            Got it
          </button>
          {/* Arrow pointing down */}
          <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-800" />
        </div>
      )}

      {mode === "idle" && !activeElement && (
        <div className="flex gap-2">
          <button
            onClick={() => {
              handleFirstAction();
              setMode("editing");
            }}
            className={`flex items-center gap-2 rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-amber-500 ${
              showOnboarding ? "animate-pulse ring-2 ring-amber-400 ring-offset-2 ring-offset-gray-950" : ""
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
            className={`flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-blue-500 ${
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
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-xs text-gray-300">
              {inputCount}
            </span>
          )}
        </div>
      )}

      {mode !== "idle" && !activeElement && (
        <div className="rounded-lg bg-gray-900 p-4 shadow-xl">
          <p className="mb-2 text-sm text-white">
            {mode === "editing"
              ? "Click any text to edit it directly"
              : "Click any element to leave a comment"}
          </p>
          <button
            onClick={() => setMode("idle")}
            className="text-sm text-gray-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
      )}

      {mode === "commenting" && activeElement && (
        <div className="w-72 rounded-lg bg-gray-900 p-4 shadow-xl">
          <p className="mb-2 truncate text-xs text-gray-400">
            {activeElement.textContent?.slice(0, 50) ||
              getSelector(activeElement)}
          </p>
          <textarea
            ref={commentInputRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What should change?"
            className="mb-3 w-full rounded border border-gray-700 bg-gray-800 p-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
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
              className="rounded px-3 py-1.5 text-sm text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={submitComment}
              disabled={!comment.trim()}
              className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
