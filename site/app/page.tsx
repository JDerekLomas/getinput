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
      <section className="px-6 pt-24 pb-20 bg-gradient-to-b from-[#fef3c7]/30 to-transparent">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-medium text-[#b45309] tracking-wide uppercase mb-4">
            Human-in-the-loop for AI
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-medium mb-6 text-[#1c1917] leading-[1.1]">
            getinput
          </h1>
          <p className="text-xl md:text-2xl text-[#57534e] mb-8 leading-relaxed">
            The feedback layer for Claude Code.{" "}
            <span className="text-[#1c1917]">See it, mark it, fix it</span> — then Claude
            reads your feedback and makes the changes.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1c1917] text-white rounded-lg font-medium hover:bg-[#292524] transition"
            >
              Try the demo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="https://github.com/JDerekLomas/getinput"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#d6d3d1] text-[#1c1917] rounded-lg font-medium hover:border-[#a8a29e] transition"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Problem statement */}
      <section className="px-6 py-16 border-y border-[#e7e5e4] bg-white">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#57534e] leading-relaxed text-lg">
            AI makes things fast. But the CTA says "Get Started on Your Journey Today!"
            when you wanted "Sign up free." The generated headshots have weird artifacts.
            The copy is technically correct but tonally wrong.
          </p>
        </div>
      </section>

      {/* Tools */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-medium mb-12 text-[#1c1917] text-center">
            Three tools
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-[#e7e5e4] p-6 hover:border-[#b45309]/30 hover:shadow-sm transition">
              <div className="w-10 h-10 rounded-lg bg-[#fef3c7] flex items-center justify-center mb-4">
                <span className="text-[#b45309] font-serif font-semibold">P</span>
              </div>
              <h3 className="font-medium text-[#1c1917] mb-2">Page</h3>
              <p className="text-[#57534e] text-sm leading-relaxed">
                Click any text to edit inline. Fix typos, improve copy, leave comments.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#e7e5e4] p-6 hover:border-[#2563eb]/30 hover:shadow-sm transition">
              <div className="w-10 h-10 rounded-lg bg-[#dbeafe] flex items-center justify-center mb-4">
                <span className="text-[#2563eb] font-serif font-semibold">P</span>
              </div>
              <h3 className="font-medium text-[#1c1917] mb-2">Picks</h3>
              <p className="text-[#57534e] text-sm leading-relaxed">
                Swipe through images. Approve keepers, reject with reasons that guide regeneration.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#e7e5e4] p-6 hover:border-[#7c3aed]/30 hover:shadow-sm transition">
              <div className="w-10 h-10 rounded-lg bg-[#f3e8ff] flex items-center justify-center mb-4">
                <span className="text-[#7c3aed] font-serif font-semibold">S</span>
              </div>
              <h3 className="font-medium text-[#1c1917] mb-2">Sift</h3>
              <p className="text-[#57534e] text-sm leading-relaxed">
                Review content batches. Approve or reject with notes that refine future output.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-20 bg-[#f5f5f4]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-medium mb-12 text-[#1c1917] text-center">
            Two ways to use it
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Developer workflow */}
            <div className="bg-white rounded-xl border border-[#e7e5e4] p-8">
              <p className="text-xs font-medium text-[#b45309] tracking-wide uppercase mb-3">
                Solo workflow
              </p>
              <h3 className="font-medium text-xl text-[#1c1917] mb-4">Review your own work</h3>
              <p className="text-[#57534e] text-sm leading-relaxed mb-6">
                Building with Claude Code? When it generates a landing page, images, or copy —
                click directly on what's wrong instead of describing it in chat.
              </p>
              <ul className="space-y-2 text-sm text-[#57534e]">
                <li className="flex gap-2">
                  <span className="text-[#b45309]">—</span>
                  Fix the CTA that says "Embark on your journey"
                </li>
                <li className="flex gap-2">
                  <span className="text-[#b45309]">—</span>
                  Reject the headshot with six fingers
                </li>
                <li className="flex gap-2">
                  <span className="text-[#b45309]">—</span>
                  Flag hallucinated specs in product copy
                </li>
              </ul>
            </div>

            {/* External feedback */}
            <div className="bg-white rounded-xl border border-[#e7e5e4] p-8">
              <p className="text-xs font-medium text-[#2563eb] tracking-wide uppercase mb-3">
                Team workflow
              </p>
              <h3 className="font-medium text-xl text-[#1c1917] mb-4">Send it out for feedback</h3>
              <p className="text-[#57534e] text-sm leading-relaxed mb-6">
                Share a URL with your client, PM, or design lead. They review visually — no
                terminal, no GitHub, no Figma.
              </p>
              <ul className="space-y-2 text-sm text-[#57534e]">
                <li className="flex gap-2">
                  <span className="text-[#2563eb]">—</span>
                  Client fixes copy inline on the page
                </li>
                <li className="flex gap-2">
                  <span className="text-[#2563eb]">—</span>
                  Marketing picks which images to use
                </li>
                <li className="flex gap-2">
                  <span className="text-[#2563eb]">—</span>
                  Stakeholder approves before it ships
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-medium mb-3 text-[#1c1917]">
              Try it
            </h2>
            <p className="text-[#57534e]">
              Your feedback appears as JSON that Claude can read.
            </p>
          </div>

          {/* Tool tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-[#f5f5f4] rounded-lg p-1">
              <button
                onClick={() => setActiveDemo("page")}
                className={`px-5 py-2 rounded-md text-sm font-medium transition ${
                  activeDemo === "page"
                    ? "bg-white text-[#1c1917] shadow-sm"
                    : "text-[#57534e] hover:text-[#1c1917]"
                }`}
              >
                Page
              </button>
              <button
                onClick={() => setActiveDemo("picks")}
                className={`px-5 py-2 rounded-md text-sm font-medium transition ${
                  activeDemo === "picks"
                    ? "bg-white text-[#1c1917] shadow-sm"
                    : "text-[#57534e] hover:text-[#1c1917]"
                }`}
              >
                Picks
              </button>
              <button
                onClick={() => setActiveDemo("sift")}
                className={`px-5 py-2 rounded-md text-sm font-medium transition ${
                  activeDemo === "sift"
                    ? "bg-white text-[#1c1917] shadow-sm"
                    : "text-[#57534e] hover:text-[#1c1917]"
                }`}
              >
                Sift
              </button>
            </div>
          </div>

          {/* Demo area */}
          <div className="bg-white rounded-2xl border border-[#e7e5e4] p-8 shadow-sm">
            {activeDemo === "page" && <PageDemo />}
            {activeDemo === "picks" && <PicksDemo />}
            {activeDemo === "sift" && <SiftDemo />}
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="px-6 py-20 bg-[#1c1917] text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-medium mb-12 text-center">
            Get started
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="text-[#b45309] font-mono text-sm mb-3">01</div>
              <p className="font-medium mb-3">Add to your project</p>
              <div className="space-y-2">
                <code className="block bg-[#292524] px-3 py-2 rounded text-sm text-[#fef3c7] font-mono">
                  npx getinput-page
                </code>
                <code className="block bg-[#292524] px-3 py-2 rounded text-sm text-[#bfdbfe] font-mono">
                  npx getinput-picks
                </code>
                <code className="block bg-[#292524] px-3 py-2 rounded text-sm text-[#e9d5ff] font-mono">
                  npx getinput-sift
                </code>
              </div>
            </div>

            <div>
              <div className="text-[#b45309] font-mono text-sm mb-3">02</div>
              <p className="font-medium mb-3">Review visually</p>
              <p className="text-[#a8a29e] text-sm leading-relaxed">
                Click text to edit. Swipe images to pick. Review content to sift.
                Everything saves as JSON.
              </p>
            </div>

            <div>
              <div className="text-[#b45309] font-mono text-sm mb-3">03</div>
              <p className="font-medium mb-3">Tell Claude</p>
              <p className="text-[#a8a29e] text-sm leading-relaxed">
                <code className="bg-[#292524] px-1.5 py-0.5 rounded text-xs font-mono text-white">/input check</code> to see feedback,{" "}
                <code className="bg-[#292524] px-1.5 py-0.5 rounded text-xs font-mono text-white">/input apply</code> to make changes.
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://github.com/JDerekLomas/getinput"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1c1917] rounded-lg font-medium hover:bg-[#f5f5f4] transition"
            >
              View on GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 bg-[#1c1917] border-t border-[#292524]">
        <div className="max-w-2xl mx-auto text-center text-[#57534e] text-sm">
          <p>Made for humans reviewing AI output.</p>
        </div>
      </footer>

      {/* The widget itself */}
      <InputWidget allowedHosts={["localhost", "getinput.io", "vercel.app"]} />
    </main>
  );
}
