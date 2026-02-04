"use client";

import { useState } from "react";
import Image from "next/image";
import InputWidget from "@/components/InputWidget";
import PageDemo from "@/components/PageDemo";
import PicksDemo from "@/components/PicksDemo";
import SiftDemo from "@/components/SiftDemo";

type DemoTab = "page" | "picks" | "sift";

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<DemoTab>("page");

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero - compact */}
      <section className="px-6 pt-16 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              getinput
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            The feedback layer for Claude Code
          </p>
          <p className="text-gray-500 mb-6">
            AI makes things. Humans catch what it gets wrong. Try it below.
          </p>
        </div>
      </section>

      {/* Interactive Demos - front and center */}
      <section id="demo" className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Tool tabs */}
          <div className="flex justify-center gap-3 mb-6">
            <button
              onClick={() => setActiveDemo("page")}
              className={`px-5 py-2.5 rounded-lg font-medium transition flex items-center gap-2 ${
                activeDemo === "page"
                  ? "bg-amber-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Page
            </button>
            <button
              onClick={() => setActiveDemo("picks")}
              className={`px-5 py-2.5 rounded-lg font-medium transition flex items-center gap-2 ${
                activeDemo === "picks"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Picks
            </button>
            <button
              onClick={() => setActiveDemo("sift")}
              className={`px-5 py-2.5 rounded-lg font-medium transition flex items-center gap-2 ${
                activeDemo === "sift"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Sift
            </button>
          </div>

          {/* Demo area */}
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
            {activeDemo === "page" && <PageDemo />}
            {activeDemo === "picks" && <PicksDemo />}
            {activeDemo === "sift" && <SiftDemo />}
          </div>
        </div>
      </section>

      {/* How it works - streamlined */}
      <section className="px-6 py-12 border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-8">Add to your project</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900 rounded-xl p-4 text-center">
              <code className="text-amber-400 text-sm">npx getinput-page</code>
              <p className="text-xs text-gray-500 mt-2">Edit text inline</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 text-center">
              <code className="text-blue-400 text-sm">npx getinput-picks</code>
              <p className="text-xs text-gray-500 mt-2">Approve/reject images</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 text-center">
              <code className="text-purple-400 text-sm">npx getinput-sift</code>
              <p className="text-xs text-gray-500 mt-2">Review AI content</p>
            </div>
          </div>
          <div className="text-center text-sm text-gray-400">
            Then tell Claude: <code className="bg-gray-800 px-2 py-1 rounded">/input check</code> to see feedback, <code className="bg-gray-800 px-2 py-1 rounded">/input apply</code> to make changes.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 border-t border-gray-800">
        <div className="max-w-xl mx-auto text-center">
          <a
            href="https://github.com/JDerekLomas/getinput"
            className="inline-block px-8 py-3 bg-amber-600 hover:bg-amber-500 rounded-lg font-medium transition"
          >
            Get started on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-gray-800 text-center text-gray-600 text-xs">
        <p>Made for humans reviewing AI output.</p>
      </footer>

      {/* The widget itself */}
      <InputWidget allowedHosts={["localhost", "getinput.io", "vercel.app"]} />
    </main>
  );
}
