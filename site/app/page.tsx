import InputWidget from "@/components/InputWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            getinput
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Human-in-the-loop review tools for AI workflows.
          </p>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto">
            Click on your site to edit text. Swipe through AI-generated images.
            Review outputs with rejection reasons. All feedback flows back to Claude Code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#demo"
              className="px-8 py-3 bg-amber-600 hover:bg-amber-500 rounded-lg font-medium transition"
            >
              Try the demo
            </a>
            <a
              href="https://github.com/JDerekLomas/getinput"
              className="px-8 py-3 border border-gray-700 hover:border-gray-500 rounded-lg font-medium transition"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="px-6 py-16 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Three tools, one workflow</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Page</h3>
              <p className="text-gray-400 text-sm">
                Click any text to edit it inline. Click any element to leave a comment.
                Perfect for design review.
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Picks</h3>
              <p className="text-gray-400 text-sm">
                Swipe through photos or AI-generated images.
                Thumbs up to keep, thumbs down with a reason.
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sift</h3>
              <p className="text-gray-400 text-sm">
                Review AI-generated content. Approve or reject with notes
                that feed back into prompt refinement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">How it works</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center shrink-0 font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-1">Add to your project</h3>
                <p className="text-gray-400">Run <code className="bg-gray-800 px-2 py-0.5 rounded text-sm">npx getinput-page</code> in any Next.js project.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center shrink-0 font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-1">Leave feedback visually</h3>
                <p className="text-gray-400">Click text to edit. Click elements to comment. Everything saves locally.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center shrink-0 font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-1">Claude reads your input</h3>
                <p className="text-gray-400">Tell Claude Code to &ldquo;check input&rdquo; and it reads your feedback, applies changes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="px-6 py-16 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Try it now</h2>
          <p className="text-gray-400 mb-8">
            This page has the feedback widget enabled. Look for the Edit and Comment buttons in the corner.
          </p>
          <div className="bg-gray-900 rounded-xl p-8 text-left">
            <h3 className="text-xl font-semibold mb-2">
              Edit this heading
            </h3>
            <p className="text-gray-400 mb-4">
              Click the Edit button, then click this text to change it directly.
              Your changes are saved locally.
            </p>
            <button className="px-4 py-2 bg-blue-600 rounded">
              Or comment on this button
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t border-gray-800">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to close the loop?</h2>
          <p className="text-gray-400 mb-8">
            Add human input to your AI workflow in minutes.
          </p>
          <a
            href="https://github.com/JDerekLomas/getinput"
            className="inline-block px-8 py-3 bg-amber-600 hover:bg-amber-500 rounded-lg font-medium transition"
          >
            Get started on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>Made for humans reviewing AI output.</p>
      </footer>

      {/* The widget itself - demo */}
      <InputWidget allowedHosts={["localhost", "getinput.io", "vercel.app"]} />
    </main>
  );
}
