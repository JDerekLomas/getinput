"use client";

import { useState } from "react";
import InputWidget from "@/components/InputWidget";
import PageDemo from "@/components/PageDemo";
import PicksDemo from "@/components/PicksDemo";
import SiftDemo from "@/components/SiftDemo";

type DemoTab = "page" | "picks" | "sift";

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<DemoTab>("page");

  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#1c1917]">
      {/* Hero */}
      <section className="px-6 pt-20 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4 text-[#1c1917]">
            getinput
          </h1>
          <p className="text-xl md:text-2xl text-[#57534e] font-serif mb-6">
            The feedback layer for Claude Code
          </p>
          <p className="text-[#57534e] leading-relaxed mb-8">
            AI makes things fast. But the CTA says "Get Started on Your Journey Today!"
            when you wanted "Sign up free." The generated headshots have weird artifacts.
            The copy is technically correct but tonally wrong.
          </p>
          <p className="text-[#1c1917] leading-relaxed">
            <strong>getinput</strong> lets you see it, mark it, and fix it — then Claude reads your feedback
            and makes the changes.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="border-t border-[#e7e5e4]" />
      </div>

      {/* Tools */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl font-medium mb-8 text-[#1c1917]">
            Three tools
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#fef3c7] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#b45309]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#1c1917] mb-1">Page</h3>
                <p className="text-[#57534e] text-sm leading-relaxed">
                  Click any text to edit it inline. Fix typos, improve copy, leave comments.
                  Perfect for reviewing AI-generated landing pages.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#dbeafe] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#1c1917] mb-1">Picks</h3>
                <p className="text-[#57534e] text-sm leading-relaxed">
                  Swipe through AI-generated images. Approve the keepers, reject with reasons.
                  Rejection notes guide the next generation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#f3e8ff] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#7c3aed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#1c1917] mb-1">Sift</h3>
                <p className="text-[#57534e] text-sm leading-relaxed">
                  Review AI-generated content. Approve or reject with notes that become
                  prompt refinements for better future output.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="border-t border-[#e7e5e4]" />
      </div>

      {/* Use Cases */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl font-medium mb-8 text-[#1c1917]">
            Two ways to use it
          </h2>

          {/* Developer workflow */}
          <div className="mb-10">
            <h3 className="font-medium text-[#1c1917] mb-3">Review your own work</h3>
            <p className="text-[#57534e] text-sm leading-relaxed mb-4">
              You're building with Claude Code and it generates a landing page, a batch of images,
              or product copy. Instead of describing fixes in chat, click directly on what's wrong.
              Your edits become structured feedback that Claude reads on the next turn.
            </p>
            <ul className="space-y-1.5 text-sm text-[#57534e]">
              <li>Fix the CTA that says "Embark on your journey" instead of "Try free"</li>
              <li>Reject the headshot with six fingers, note why</li>
              <li>Approve 12 of 50 product descriptions, flag the hallucinated specs</li>
            </ul>
          </div>

          {/* External feedback */}
          <div>
            <h3 className="font-medium text-[#1c1917] mb-3">Send it out for feedback</h3>
            <p className="text-[#57534e] text-sm leading-relaxed mb-4">
              Share a URL with your client, PM, or design lead. They review visually — no
              terminal, no GitHub, no Figma comments. Their feedback saves as JSON. You pull
              it back into Claude Code with <code className="bg-[#f5f5f4] px-1 py-0.5 rounded text-xs font-mono">/input check</code> and
              apply the changes.
            </p>
            <ul className="space-y-1.5 text-sm text-[#57534e]">
              <li>Client clicks through the landing page, fixes copy inline</li>
              <li>Marketing picks which generated images to use</li>
              <li>Stakeholder approves or rejects content before it ships</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="border-t border-[#e7e5e4]" />
      </div>

      {/* Demo */}
      <section id="demo" className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl mx-auto mb-8">
            <h2 className="font-serif text-2xl font-medium mb-2 text-[#1c1917]">
              Try it
            </h2>
            <p className="text-[#57534e]">
              Interactive demos of each tool. Your feedback appears as JSON that Claude can read.
            </p>
          </div>

          {/* Tool tabs */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveDemo("page")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeDemo === "page"
                  ? "bg-[#b45309] text-white"
                  : "text-[#57534e] hover:text-[#b45309]"
              }`}
            >
              Page
            </button>
            <button
              onClick={() => setActiveDemo("picks")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeDemo === "picks"
                  ? "bg-[#2563eb] text-white"
                  : "text-[#57534e] hover:text-[#2563eb]"
              }`}
            >
              Picks
            </button>
            <button
              onClick={() => setActiveDemo("sift")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeDemo === "sift"
                  ? "bg-[#7c3aed] text-white"
                  : "text-[#57534e] hover:text-[#7c3aed]"
              }`}
            >
              Sift
            </button>
          </div>

          {/* Demo area */}
          <div className="bg-white rounded-xl border border-[#e7e5e4] p-6 shadow-sm">
            {activeDemo === "page" && <PageDemo />}
            {activeDemo === "picks" && <PicksDemo />}
            {activeDemo === "sift" && <SiftDemo />}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="border-t border-[#e7e5e4]" />
      </div>

      {/* How to use */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl font-medium mb-8 text-[#1c1917]">
            Get started
          </h2>

          <div className="space-y-6 mb-10">
            <div className="flex gap-4">
              <span className="text-[#a8a29e] font-medium shrink-0">1.</span>
              <div>
                <p className="text-[#1c1917] mb-2">Add to your project</p>
                <div className="space-y-2">
                  <code className="block bg-[#f5f5f4] px-3 py-2 rounded text-sm text-[#b45309] font-mono">
                    npx getinput-page
                  </code>
                  <code className="block bg-[#f5f5f4] px-3 py-2 rounded text-sm text-[#2563eb] font-mono">
                    npx getinput-picks
                  </code>
                  <code className="block bg-[#f5f5f4] px-3 py-2 rounded text-sm text-[#7c3aed] font-mono">
                    npx getinput-sift
                  </code>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-[#a8a29e] font-medium shrink-0">2.</span>
              <div>
                <p className="text-[#1c1917] mb-1">Review visually</p>
                <p className="text-[#57534e] text-sm">
                  Click text to edit. Swipe images to pick. Review content to sift.
                  Everything saves as JSON.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-[#a8a29e] font-medium shrink-0">3.</span>
              <div>
                <p className="text-[#1c1917] mb-1">Tell Claude</p>
                <p className="text-[#57534e] text-sm">
                  <code className="bg-[#f5f5f4] px-1.5 py-0.5 rounded text-xs font-mono">/input check</code> to see feedback, {" "}
                  <code className="bg-[#f5f5f4] px-1.5 py-0.5 rounded text-xs font-mono">/input apply</code> to make changes.
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://github.com/JDerekLomas/getinput"
            className="inline-block px-6 py-2.5 bg-[#b45309] text-white rounded-md font-medium hover:opacity-90 transition"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-[#e7e5e4]">
        <div className="max-w-2xl mx-auto text-center text-[#a8a29e] text-sm">
          <p>Made for humans reviewing AI output.</p>
        </div>
      </footer>

      {/* The widget itself */}
      <InputWidget allowedHosts={["localhost", "getinput.io", "vercel.app"]} />
    </main>
  );
}
