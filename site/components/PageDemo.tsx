"use client";

import { useState } from "react";

interface FeedbackItem {
  type: "edit";
  selector: string;
  original: string;
  edited: string;
  timestamp: string;
}

export default function PageDemo() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [hasEdited, setHasEdited] = useState(false);

  // Editable content state
  const [content, setContent] = useState({
    headline: "Welcom to Our Amasing Product",
    subheadline: "The best solution for all you're problems and needs",
    feature1: "Fast & Reliabel",
    feature2: "Easy too Use",
    feature3: "24/7 Suport",
    cta: "Get Strated Tooday",
    description: "Our product helps you achive your goals with minimal efforrt. Join thousends of happy customers who have already discoverd the benifits.",
  });

  const handleEdit = (key: keyof typeof content, newValue: string) => {
    const original = content[key];
    if (original !== newValue) {
      setFeedback((prev) => [
        ...prev,
        {
          type: "edit",
          selector: `[data-editable="${key}"]`,
          original,
          edited: newValue,
          timestamp: new Date().toISOString(),
        },
      ]);
      setContent((prev) => ({ ...prev, [key]: newValue }));
      setHasEdited(true);
    }
    setActiveElement(null);
  };

  const currentStep = !isEditMode ? 1 : !hasEdited ? 2 : 3;

  const EditableText = ({
    id,
    children,
    className = "",
    as: Component = "span",
  }: {
    id: keyof typeof content;
    children: React.ReactNode;
    className?: string;
    as?: "span" | "p" | "h1" | "h2" | "h3" | "button";
  }) => {
    const isActive = activeElement === id;

    if (!isEditMode) {
      return <Component className={className}>{children}</Component>;
    }

    return (
      <Component
        data-editable={id}
        className={`${className} cursor-text transition-all ${
          isActive
            ? "outline outline-2 outline-amber-500 outline-offset-2"
            : "hover:outline hover:outline-1 hover:outline-amber-500/50 hover:outline-offset-2"
        }`}
        contentEditable={isActive}
        suppressContentEditableWarning
        onClick={() => setActiveElement(id)}
        onBlur={(e) => {
          const target = e.target as HTMLElement;
          handleEdit(id, target.textContent || "");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            (e.target as HTMLElement).blur();
          }
          if (e.key === "Escape") {
            setActiveElement(null);
          }
        }}
      >
        {children}
      </Component>
    );
  };

  return (
    <div className="space-y-4">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2 text-xs">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
          currentStep === 1 ? "bg-amber-600 text-white" : currentStep > 1 ? "bg-green-600/20 text-green-400" : "bg-gray-800 text-gray-500"
        }`}>
          <span className="font-bold">1</span>
          <span>Click Edit Mode</span>
          {currentStep > 1 && <span>&#10003;</span>}
        </div>
        <div className="w-4 h-px bg-gray-700" />
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
          currentStep === 2 ? "bg-amber-600 text-white" : currentStep > 2 ? "bg-green-600/20 text-green-400" : "bg-gray-800 text-gray-500"
        }`}>
          <span className="font-bold">2</span>
          <span>Fix a typo</span>
          {currentStep > 2 && <span>&#10003;</span>}
        </div>
        <div className="w-4 h-px bg-gray-700" />
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
          currentStep === 3 ? "bg-green-600 text-white" : "bg-gray-800 text-gray-500"
        }`}>
          <span className="font-bold">3</span>
          <span>See JSON</span>
          {hasEdited && <span>&#10003;</span>}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Flawed landing page mockup */}
        <div className="relative">
          <div className="absolute -top-3 left-4 z-10 flex gap-2">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                isEditMode
                  ? "bg-amber-600 text-white"
                  : "bg-amber-600 text-white animate-pulse ring-2 ring-amber-400 ring-offset-2 ring-offset-gray-900"
              } ${currentStep !== 1 && !isEditMode ? "animate-none ring-0" : ""}`}
            >
              {isEditMode ? "Editing..." : "Edit Mode"}
            </button>
            {feedback.length > 0 && (
              <button
                onClick={() => {
                  setFeedback([]);
                  setHasEdited(false);
                }}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600"
              >
                Reset ({feedback.length})
              </button>
            )}
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            {/* Browser chrome */}
            <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-700 rounded px-3 py-1 text-xs text-gray-400">
                  https://example.com
                </div>
              </div>
            </div>

            {/* Page content */}
            <div className="p-6 space-y-6">
              <div className="text-center space-y-3">
                <EditableText
                  id="headline"
                  as="h1"
                  className="text-2xl font-bold text-white"
                >
                  {content.headline}
                </EditableText>
                <EditableText
                  id="subheadline"
                  as="p"
                  className="text-gray-400"
                >
                  {content.subheadline}
                </EditableText>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-amber-500 text-lg mb-1">&#9889;</div>
                  <EditableText id="feature1" className="text-sm text-gray-300">
                    {content.feature1}
                  </EditableText>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-blue-500 text-lg mb-1">&#10003;</div>
                  <EditableText id="feature2" className="text-sm text-gray-300">
                    {content.feature2}
                  </EditableText>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-purple-500 text-lg mb-1">&#9734;</div>
                  <EditableText id="feature3" className="text-sm text-gray-300">
                    {content.feature3}
                  </EditableText>
                </div>
              </div>

              <EditableText
                id="description"
                as="p"
                className="text-sm text-gray-400 text-center"
              >
                {content.description}
              </EditableText>

              <div className="text-center">
                <EditableText
                  id="cta"
                  as="button"
                  className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-lg font-medium"
                >
                  {content.cta}
                </EditableText>
              </div>
            </div>
          </div>

          {isEditMode && !hasEdited && (
            <p className="text-xs text-amber-400 mt-2 text-center animate-pulse">
              &#8593; Click any text above to edit it
            </p>
          )}
        </div>

        {/* Feedback panel */}
        <div className={`bg-gray-900 rounded-xl border p-4 transition ${
          hasEdited ? "border-green-500/50" : "border-gray-800"
        }`}>
          <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${hasEdited ? "bg-green-500" : "bg-gray-600"}`} />
            Feedback JSON
            {hasEdited && <span className="text-green-400 text-xs ml-auto">Claude reads this!</span>}
          </h4>
          <pre className="text-xs text-gray-400 bg-gray-950 rounded-lg p-3 overflow-auto max-h-80 font-mono">
            {feedback.length === 0 ? (
              <span className="text-gray-600">
                {`// Your edits will appear here\n// Claude reads this JSON and applies\n// changes to your source files\n\n[\n  // No feedback yet\n]`}
              </span>
            ) : (
              JSON.stringify(feedback, null, 2)
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
