import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FFF4E3] mt-5">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#F6C453]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#C8412B]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 md:grid-cols-2 md:py-24">
        {/* ---------- LEFT: Text ---------- */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#C8412B] shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#C8412B]" />
            Now delivering near you
          </span>

          <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-[#2B1A12] md:text-6xl lg:text-7xl">
            Hot pizza,
            <br />
            <span className="relative inline-block text-[#C8412B]">
              delivered
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8C60 2 120 2 180 6C220 8 260 5 297 4"
                  stroke="#F6C453"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            fast.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#5B4636]">
            Order big, beautiful pies from the little local pizzerias you love
            — straight to your door while they&apos;re still bubbling.
          </p>

          {/* Order bar */}
          <form
            action="/menu"
            className="mt-8 flex max-w-md items-center gap-2 rounded-full bg-white p-2 pl-5 shadow-lg ring-1 ring-black/5"
          >
            <span aria-hidden="true">📍</span>
            <input
              type="text"
              name="area"
              placeholder="Enter your delivery area"
              className="w-full bg-transparent text-sm text-[#2B1A12] placeholder:text-[#9C8672] focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-[#C8412B] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#A93421]"
            >
              Order now
            </button>
          </form>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <Stat value="30 min" label="Avg. delivery" />
            <Stat value="4.9 ★" label="Customer rating" />
            <Stat value="12k+" label="Happy pizza people" />
          </div>

          <p className="mt-8 text-sm text-[#5B4636]">
            Own a pizzeria?{" "}
            <Link
              href="/partner"
              className="font-bold text-[#2B1A12] underline decoration-[#F6C453] decoration-2 underline-offset-4 hover:text-[#C8412B]"
            >
              Partner with us
            </Link>
          </p>
        </div>

        {/* ---------- RIGHT: Image ---------- */}
        <div className="relative mx-auto aspect-square w-full max-w-md">
          {/* Offset color circle behind the photo */}
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-full bg-[#C8412B]" />

          {/* Round photo */}
          <div className="absolute inset-0 overflow-hidden rounded-full ring-8 ring-white shadow-2xl">
            <Image
              src="/pizza-hero.jpg"
              alt="Freshly baked cheesy pizza"
              fill
              priority
              sizes="(min-width: 768px) 448px, 90vw"
              className="object-cover"
            />
          </div>

          {/* Floating card: rating */}
          <div className="absolute -left-4 top-10 flex -rotate-3 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl md:-left-10">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4E3] text-lg">
              ⭐
            </span>
            <div>
              <p className="text-sm font-bold text-[#2B1A12]">4.9 Rating</p>
              <p className="text-xs text-[#9C8672]">12,000+ reviews</p>
            </div>
          </div>

          {/* Floating card: fresh from oven */}
          <div className="absolute -right-2 bottom-8 flex rotate-3 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl md:-right-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDE3DC] text-lg">
              🔥
            </span>
            <div>
              <p className="text-sm font-bold text-[#2B1A12]">Fresh from the oven</p>
              <p className="text-xs text-[#9C8672]">Local favorites near you</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type StatProps = {
  value: string;
  label: string;
};

function Stat({ value, label }: StatProps) {
  return (
    <div>
      <p className="text-2xl font-black text-[#2B1A12]">{value}</p>
      <p className="text-xs uppercase tracking-wider text-[#9C8672]">{label}</p>
    </div>
  );
}