"use client";

import { useState } from "react";
import InputWidget from "@/components/InputWidget";
import PageDemo from "@/components/PageDemo";
import PicksDemo from "@/components/PicksDemo";
import SiftDemo from "@/components/SiftDemo";
import CommunityFeedMockup from "@/components/CommunityFeedMockup";
import PageToolMockup from "@/components/PageToolMockup";
import PicksToolMockup from "@/components/PicksToolMockup";
import SiftToolMockup from "@/components/SiftToolMockup";
import SoloMockup from "@/components/SoloMockup";
import TeamMockup from "@/components/TeamMockup";
import HeroMockup from "@/components/HeroMockup";
import LoopMockup from "@/components/LoopMockup";

type DemoTab = "page" | "picks" | "sift";

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<DemoTab>("page");

  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#1c1917]">
      {/* Hero */}
      <section className="px-6 pt-24 pb-20 bg-gradient-to-b from-[#fef3c7]/30 to-transparent">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-[#b45309] tracking-wide uppercase mb-4">
            Design feedback for the AI era
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-medium mb-6 text-[#1c1917] leading-[1.1]">
            Get better feedback on<br />AI-generated work
          </h1>
          <p className="text-xl text-[#57534e] mb-8 leading-relaxed max-w-2xl mx-auto">
            AI can generate a landing page in seconds. But is the copy right? Are the images good?
            Get feedback from yourself, your team, or the community — then feed it back to the AI.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1c1917] text-white rounded-lg font-medium hover:bg-[#292524] transition"
            >
              Try it now
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#d6d3d1] text-[#1c1917] rounded-lg font-medium hover:border-[#a8a29e] transition"
            >
              How it works
            </a>
          </div>

          {/* Hero mockup */}
          <div className="max-w-4xl mx-auto">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#e7e5e4] shadow-lg">
              <HeroMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Social proof placeholder */}
      <section className="px-6 py-12 border-y border-[#e7e5e4] bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-serif font-medium text-[#1c1917]">—</p>
              <p className="text-sm text-[#57534e] mt-1">designs reviewed</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-medium text-[#1c1917]">—</p>
              <p className="text-sm text-[#57534e] mt-1">feedback given</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-medium text-[#1c1917]">—</p>
              <p className="text-sm text-[#57534e] mt-1">community members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three levels of feedback */}
      <section id="how-it-works" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-medium mb-4 text-[#1c1917] text-center">
            Three ways to get feedback
          </h2>
          <p className="text-[#57534e] text-center mb-12 max-w-xl mx-auto">
            Start solo, share with your team, or tap into the community. Your choice.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-[#e7e5e4] p-6 hover:shadow-sm transition">
              {/* Solo mockup */}
              <div className="aspect-[4/3] rounded-lg border border-[#e7e5e4] overflow-hidden mb-4">
                <SoloMockup />
              </div>
              <p className="text-xs font-medium text-[#a8a29e] tracking-wide uppercase mb-3">
                Free
              </p>
              <h3 className="font-medium text-xl text-[#1c1917] mb-3">Solo</h3>
              <p className="text-[#57534e] text-sm leading-relaxed mb-4">
                Review your own AI output. Click on what's wrong, type the fix, feed it back to Claude.
              </p>
              <ul className="space-y-2 text-sm text-[#57534e]">
                <li>Inline text editing</li>
                <li>Image approval/rejection</li>
                <li>JSON export for AI</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-[#e7e5e4] p-6 hover:shadow-sm transition">
              {/* Team mockup */}
              <div className="aspect-[4/3] rounded-lg border border-[#e7e5e4] overflow-hidden mb-4">
                <TeamMockup />
              </div>
              <p className="text-xs font-medium text-[#2563eb] tracking-wide uppercase mb-3">
                Share link
              </p>
              <h3 className="font-medium text-xl text-[#1c1917] mb-3">Team</h3>
              <p className="text-[#57534e] text-sm leading-relaxed mb-4">
                Send a review link to your client, PM, or design lead. They click, you get structured feedback.
              </p>
              <ul className="space-y-2 text-sm text-[#57534e]">
                <li>Shareable review URLs</li>
                <li>No login required</li>
                <li>Feedback aggregation</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-[#e7e5e4] p-6 hover:shadow-sm transition relative overflow-hidden">
              <div className="absolute top-3 right-3 text-xs font-medium text-[#b45309] bg-[#fef3c7] px-2 py-0.5 rounded z-10">
                Coming soon
              </div>
              {/* Community feed mockup */}
              <div className="aspect-[4/3] rounded-lg border border-[#e7e5e4] overflow-hidden mb-4">
                <CommunityFeedMockup />
              </div>
              <p className="text-xs font-medium text-[#b45309] tracking-wide uppercase mb-3">
                Post publicly
              </p>
              <h3 className="font-medium text-xl text-[#1c1917] mb-3">Community</h3>
              <p className="text-[#57534e] text-sm leading-relaxed mb-4">
                Post your design and get feedback from other designers. Build reputation by giving good feedback.
              </p>
              <ul className="space-y-2 text-sm text-[#57534e]">
                <li>Public design feed</li>
                <li>Reputation system</li>
                <li>Expert reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="px-6 py-20 bg-[#1c1917] text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-medium mb-6">
            AI generates fast.<br />Humans catch what it misses.
          </h2>
          <p className="text-[#a8a29e] leading-relaxed text-lg mb-8">
            The CTA says "Embark on Your Journey Today!" when you wanted "Sign up free."
            The headshots have weird artifacts. The copy is technically correct but tonally wrong.
          </p>
          <p className="text-white leading-relaxed text-lg">
            You need eyes on it — your own, your team's, or the crowd's.
          </p>
        </div>
      </section>

      {/* Tools */}
      <section className="px-6 py-20 bg-[#f5f5f4]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-medium mb-4 text-[#1c1917] text-center">
            Three ways to give feedback
          </h2>
          <p className="text-[#57534e] text-center mb-12 max-w-xl mx-auto">
            Different content types need different review tools.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-[#e7e5e4] p-6">
              {/* Page tool mockup */}
              <div className="aspect-[4/3] rounded-lg border border-[#e7e5e4] overflow-hidden mb-4">
                <PageToolMockup />
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#fef3c7] flex items-center justify-center mb-4">
                <span className="text-[#b45309] font-mono text-sm font-semibold">Pg</span>
              </div>
              <h3 className="font-medium text-[#1c1917] mb-2">Page</h3>
              <p className="text-[#57534e] text-sm leading-relaxed">
                Click any text to edit inline. Review landing pages, blog posts, marketing copy.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#e7e5e4] p-6">
              {/* Picks tool mockup */}
              <div className="aspect-[4/3] rounded-lg border border-[#e7e5e4] overflow-hidden mb-4">
                <PicksToolMockup />
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#dbeafe] flex items-center justify-center mb-4">
                <span className="text-[#2563eb] font-mono text-sm font-semibold">Pk</span>
              </div>
              <h3 className="font-medium text-[#1c1917] mb-2">Picks</h3>
              <p className="text-[#57534e] text-sm leading-relaxed">
                Swipe through images. Approve the keepers, reject with notes for regeneration.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#e7e5e4] p-6">
              {/* Sift tool mockup */}
              <div className="aspect-[4/3] rounded-lg border border-[#e7e5e4] overflow-hidden mb-4">
                <SiftToolMockup />
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#f3e8ff] flex items-center justify-center mb-4">
                <span className="text-[#7c3aed] font-mono text-sm font-semibold">Sf</span>
              </div>
              <h3 className="font-medium text-[#1c1917] mb-2">Sift</h3>
              <p className="text-[#57534e] text-sm leading-relaxed">
                Review content batches. Approve or reject product descriptions, FAQs, social posts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-medium mb-3 text-[#1c1917]">
              Try the tools
            </h2>
            <p className="text-[#57534e]">
              Click, swipe, approve, reject. Your feedback becomes structured data.
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

      {/* The feedback loop */}
      <section className="px-6 py-20 bg-[#f5f5f4]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-medium mb-4 text-[#1c1917] text-center">
            The feedback loop
          </h2>
          <p className="text-[#57534e] text-center mb-12 max-w-xl mx-auto">
            Mark it up, feed it back, watch it improve.
          </p>

          {/* Loop mockup */}
          <div className="aspect-[21/9] rounded-2xl overflow-hidden border border-[#e7e5e4] shadow-sm">
            <LoopMockup />
          </div>
        </div>
      </section>

      {/* Install skill */}
      <section id="install" className="px-6 py-20 border-t border-[#e7e5e4] bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-14 h-14 rounded-xl bg-[#f5f5f4] flex items-center justify-center mx-auto mb-4">
              <span className="font-mono text-lg text-[#57534e]">&gt;_</span>
            </div>
            <h2 className="font-serif text-3xl font-medium mb-3 text-[#1c1917]">
              Install the Claude Code skill
            </h2>
            <p className="text-[#57534e]">
              One command to add feedback to any Next.js project.
            </p>
          </div>

          {/* Install command */}
          <div className="bg-[#1c1917] rounded-xl p-6 mb-8">
            <p className="text-[#a8a29e] text-xs mb-2 font-mono">Install the skill:</p>
            <div className="flex items-center gap-3">
              <code className="text-white font-mono text-sm flex-1 overflow-x-auto">
                curl -o ~/.claude/skills/input.md https://raw.githubusercontent.com/JDerekLomas/getinput/main/skill.md
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("curl -o ~/.claude/skills/input.md https://raw.githubusercontent.com/JDerekLomas/getinput/main/skill.md");
                }}
                className="text-[#a8a29e] hover:text-white transition p-2"
                title="Copy to clipboard"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Commands */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#f5f5f4] rounded-lg p-4">
              <code className="text-[#b45309] font-mono text-sm font-medium">/input setup</code>
              <p className="text-[#57534e] text-sm mt-1">Add widget to your project</p>
            </div>
            <div className="bg-[#f5f5f4] rounded-lg p-4">
              <code className="text-[#b45309] font-mono text-sm font-medium">/input share</code>
              <p className="text-[#57534e] text-sm mt-1">Generate link for others to review</p>
            </div>
            <div className="bg-[#f5f5f4] rounded-lg p-4">
              <code className="text-[#b45309] font-mono text-sm font-medium">/input check</code>
              <p className="text-[#57534e] text-sm mt-1">View pending feedback</p>
            </div>
            <div className="bg-[#f5f5f4] rounded-lg p-4">
              <code className="text-[#b45309] font-mono text-sm font-medium">/input apply</code>
              <p className="text-[#57534e] text-sm mt-1">Apply edits to source files</p>
            </div>
          </div>

          <p className="text-center text-[#a8a29e] text-sm mt-8">
            Works with any Next.js project. Widget shows on localhost, syncs with Claude Code.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-[#1c1917] text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-medium mb-4">
            Join the community
          </h2>
          <p className="text-[#a8a29e] mb-8 leading-relaxed">
            Get feedback on your AI-generated designs. Give feedback to others.
            Build your reputation as a design reviewer.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1c1917] rounded-lg font-medium hover:bg-[#f5f5f4] transition"
            >
              Join waitlist
            </a>
            <a
              href="https://github.com/JDerekLomas/getinput"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#57534e] text-white rounded-lg font-medium hover:border-[#a8a29e] transition"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 bg-[#1c1917] border-t border-[#292524]">
        <div className="max-w-2xl mx-auto text-center text-[#57534e] text-sm">
          <p>Design feedback for the AI era.</p>
        </div>
      </footer>

      {/* The widget itself */}
      <InputWidget allowedHosts={["localhost", "getinput.io", "vercel.app"]} />
    </main>
  );
}
