import Image from "next/image";
import Link from "next/link";
import BentoBanner from "@/app/assests/pizza-oven.jpg"
export default function AboutBento() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#FFF4E3] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#C8412B]">
            More than a pizza run
          </span>
          <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#2B1A12] md:text-6xl">
            Local pies.{" "}
            <span className="relative inline-block text-[#C8412B]">
              Full hearts.
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
            </span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[#5B4636]">
            We bring the neighborhood’s best ovens a little closer to your
            couch. Every order supports a real local shop and the people who
            make it special.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] md:col-span-2 md:row-span-2">
            <Image
              src={BentoBanner}
              alt="Wood-fired pizza resting on a wooden board in front of the oven"
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover"
            />
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg">
              <span className="text-[#F6C453]">★</span>
              <span className="text-sm font-black text-[#2B1A12]">4.9</span>
              <span className="text-xs text-[#5B4636]">
                average neighborhood rating
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-[2rem] bg-[#F6C453] p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C8412B]">
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
                <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
            </span>
            <div className="mt-8">
              <h3 className="text-xl font-black text-[#2B1A12]">
                Discover your local legends
              </h3>
              <p className="mt-2 text-sm text-[#5B4636]">
                Independent pizzerias, all in one delicious place.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-[2rem] bg-[#2B1A12] p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C8412B] text-white">
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
                <path d="M12 3 5 6v5.5c0 4.3 2.9 8 7 9.5 4.1-1.5 7-5.2 7-9.5V6l-7-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <div className="mt-8">
              <h3 className="text-xl font-black text-white">
                Order with confidence
              </h3>
              <p className="mt-2 text-sm text-[#E8D5C0]">
                Real reviews, clear updates, and no surprises.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full bg-[#C8412B] px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#A93421]"
          >
            Find your new favorite{" "}
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
        </div>
      </div>
    </section>
  );
}