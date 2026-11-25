import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#FFF4E3]">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C8412B] text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 21 3.5 6.5a17 17 0 0 1 17 0L12 21Z" />
                  <circle cx="10" cy="9.5" r="1" fill="currentColor" />
                  <circle cx="14" cy="11" r="1" fill="currentColor" />
                  <circle cx="12" cy="15" r="1" fill="currentColor" />
                </svg>
              </span>
              <span className="text-lg font-black tracking-tight text-[#2B1A12]">
                Pizza<span className="text-[#C8412B]">Hub</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-2xl font-black leading-snug text-[#2B1A12]">
              Good pizza from good neighbors.{" "}
              <span className="text-[#C8412B]">That’s the whole idea.</span>
            </p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#C8412B]">
              Explore
            </h4>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-[#5B4636]">
              <li>
                <Link href="/" className="transition hover:text-[#C8412B]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="transition hover:text-[#C8412B]">
                  Browse the menu
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#C8412B]">
              For pizzerias
            </h4>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-[#5B4636]">
              <li>
                <Link
                  href="/partner"
                  className="transition hover:text-[#C8412B]"
                >
                  Partner with us
                </Link>
              </li>
              <li>
                <Link
                  href="/vendor/login"
                  className="transition hover:text-[#C8412B]"
                >
                  Vendor sign in
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#C8412B]">
              Say hello
            </h4>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-[#5B4636]">
              <li>
                <a
                  href="mailto:hello@pizzahub.demo"
                  className="transition hover:text-[#C8412B]"
                >
                  hello@pizzahub.demo
                </a>
              </li>
              <li>Brooklyn, New York</li>
            </ul>
            <div className="mt-5 flex gap-2">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-[#2B1A12] shadow-sm transition hover:bg-[#C8412B] hover:text-white"
              >
                ig
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-[#2B1A12] shadow-sm transition hover:bg-[#C8412B] hover:text-white"
              >
                f
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-[#2B1A12] shadow-sm transition hover:bg-[#C8412B] hover:text-white"
              >
                tk
              </a>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-[#2B1A12]/10 py-6 text-xs text-[#8A6F58] md:flex-row">
          <p>© 2026 PizzaHub. Made with a little extra cheese.</p>
          <p>Local pizza. Big love.</p>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none mb-[-3vw] select-none text-center text-[22vw] font-black leading-none tracking-tighter text-[#2B1A12]/5"
      >
        PizzaHub
      </p>
    </footer>
  );
}