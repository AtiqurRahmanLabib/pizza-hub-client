export default function Steps() {
  return (
    <section className="bg-[#FFF4E3] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#C8412B] shadow-sm">
            Three steps to very happy
          </span>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-[#2B1A12] md:text-6xl">
            Pizza night, <span className="text-[#C8412B]">sorted.</span>
          </h2>
        </div>
        <div className="relative mt-20 grid gap-14 md:grid-cols-3 md:gap-6">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-0 hidden border-t-2 border-dashed border-[#C8412B]/30 md:block"></div>
          <div className="relative rounded-3xl bg-white px-7 pb-8 pt-14 text-center shadow-lg shadow-[#C8412B]/10">
            <span className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full text-2xl font-black ring-8 ring-[#FFF4E3] bg-[#C8412B] text-white">
              1
            </span>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF4E3] text-[#C8412B]">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <h3 className="mt-5 text-xl font-black text-[#2B1A12]">
              Find your pie
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5B4636]">
              Explore neighborhood favorites and discover your next go-to.
            </p>
          </div>
          <div className="relative rounded-3xl bg-white px-7 pb-8 pt-14 text-center shadow-lg shadow-[#C8412B]/10">
            <span className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full text-2xl font-black ring-8 ring-[#FFF4E3] bg-[#F6C453] text-[#2B1A12]">
              2
            </span>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF4E3] text-[#C8412B]">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 8h12l-1 12H7L6 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
            </span>
            <h3 className="mt-5 text-xl font-black text-[#2B1A12]">
              Make it yours
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5B4636]">
              Choose your favorite, add a note, and pick a delivery date.
            </p>
          </div>
          <div className="relative rounded-3xl bg-white px-7 pb-8 pt-14 text-center shadow-lg shadow-[#C8412B]/10">
            <span className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full text-2xl font-black ring-8 ring-[#FFF4E3] bg-[#2B1A12] text-white">
              3
            </span>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF4E3] text-[#C8412B]">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 6h11v10H3z" />
                <path d="M14 10h4l3 3v3h-7" />
                <circle cx="7" cy="18" r="2" />
                <circle cx="17" cy="18" r="2" />
              </svg>
            </span>
            <h3 className="mt-5 text-xl font-black text-[#2B1A12]">
              Stay in. Feast.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5B4636]">
              Your local pizza pros handle the rest. Napkins are on you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}