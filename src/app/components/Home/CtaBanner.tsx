import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="bg-white px-6 py-16 md:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#B8351F_0%,#C8412B_45%,#E2603F_100%)] px-8 py-14 md:px-16 md:py-20">
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#F6C453]/30 blur-3xl"></div>
        <div
          className="pointer-events-none absolute -bottom-10 right-24 select-none text-[10rem] leading-none opacity-20"
          aria-hidden="true"
        >
          🍕
        </div>
        <div className="relative grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FFE7B0]">
              Good pizza is better together
            </span>
            <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl">
              Bring your neighborhood to the table.
            </h2>
            <p className="mt-5 max-w-md text-lg text-white/85">
              Find a local favorite or share what you make with the block.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F6C453] px-8 py-4 text-sm font-black text-[#2B1A12] shadow-xl transition hover:bg-[#FFD36E]"
            >
              I’m hungry{" "}
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/partner"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/70 px-8 py-4 text-sm font-black text-white transition hover:bg-white hover:text-[#C8412B]"
            >
              I’m a pizzeria
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}