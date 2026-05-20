/* eslint-disable @next/next/no-img-element */
export default function HeroMockup() {
  return (
    <div className="bg-[#f5f5f4] rounded-2xl p-4 md:p-6 h-full flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
        <figure className="flex flex-col gap-2">
          <figcaption className="text-xs font-medium text-[#a8a29e] uppercase tracking-wide">
            1 — On the live site
          </figcaption>
          <img
            src="/demo/before.png"
            alt="Original headline on getinput.io with the Edit and Comment widget visible"
            className="rounded-lg border border-[#e7e5e4] shadow-sm w-full h-auto"
          />
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className="text-xs font-medium text-[#b45309] uppercase tracking-wide">
            2 — Edited via the widget
          </figcaption>
          <img
            src="/demo/after.png"
            alt="Headline edited to 'Directly edit websites made by Claude' with 2 edits captured by the widget"
            className="rounded-lg border-2 border-[#b45309]/40 shadow-sm w-full h-auto"
          />
        </figure>
      </div>
    </div>
  );
}
