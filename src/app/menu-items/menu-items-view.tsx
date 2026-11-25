"use client";

// Client component: all the interactive UI (search, filters, favorites).
// Data comes from the server page as the `items` prop.

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bowlby_One, Figtree } from "next/font/google";
import {
  ArrowUpRight,
  ChevronDown,
  Heart,
  MapPin,
  Pizza,
  Search,
  SearchX,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import type { MenuItem } from "@/lib/types/menu-item";
import Image from "next/image";

const display = Bowlby_One({ subsets: ["latin"], weight: "400" });
const body = Figtree({ subsets: ["latin"] });

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

const sortOptions: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

const ink = "border-2 border-[#26213A]";
const control =
  `${ink} h-12 rounded-xl bg-white text-[15px] shadow-none ` +
  "focus-visible:ring-0 focus-visible:shadow-[3px_3px_0_#F2B33D]";

export default function MenuItemsView({
  items,
  loading = false,
}: {
  items: MenuItem[];
  loading?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [category, setCategory] = useState("all");
  const [liked, setLiked] = useState<Set<MenuItem["_id"]>>(new Set());

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))).sort(),
    [items],
  );

  const locations = useMemo(
    () => Array.from(new Set(items.map((i) => i.location))).sort(),
    [items],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = items.filter(
      (i) =>
        (category === "all" || i.category === category) &&
        (location === "all" || i.location === location) &&
        (!q ||
          i.name.toLowerCase().includes(q) ||
          i.pizzeria?.toLowerCase().includes(q)),
    );
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating")
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return list;
  }, [items, query, location, sort, category]);

  function toggleLike(id: MenuItem["_id"]) {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <main
      className={`${body.className} min-h-screen bg-[#FFF4E2] px-5 py-10 sm:px-8 lg:px-12 text-[#26213A]`}
    >
      <div className="w-full">
        {/* Hero */}
        <section
          className={`${ink} relative overflow-hidden rounded-3xl bg-[#E8452C] p-8 text-white shadow-[8px_8px_0_#26213A] sm:p-12`}
        >
          <h1
            className={`${display.className} max-w-xl text-4xl leading-[1.05] sm:text-6xl`}
          >
            Find your perfect pie
          </h1>
          <p className="mt-4 max-w-md text-base font-medium text-white/90">
            Fresh from independent pizzerias around the corner. Search, pick,
            and order.
          </p>
          <span
            aria-hidden
            className={`${ink} absolute -bottom-10 right-6 grid size-40 rotate-12 place-items-center rounded-full bg-[#F2B33D] text-[#26213A] shadow-[4px_4px_0_#26213A] sm:right-14 sm:size-52`}
          >
            <Pizza className="size-20 -translate-y-3 -rotate-12 sm:size-24" />
          </span>
        </section>

        {/* Toolbar */}
        <section className="mt-10 grid gap-4 md:grid-cols-[1fr_220px_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#26213A]/60" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pizzas, sides, dessert"
              aria-label="Search menu"
              className={`${control} pl-12 placeholder:text-[#26213A]/40`}
            />
          </div>

          <div className="relative">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label="Filter by location"
              className={`${ink} h-12 w-full cursor-pointer appearance-none rounded-xl bg-white pl-12 pr-10 text-[15px] font-semibold outline-none focus-visible:shadow-[3px_3px_0_#F2B33D]`}
            >
              <option value="all">All locations</option>
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2" />
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort menu"
              className={`${ink} h-12 w-full cursor-pointer appearance-none rounded-xl bg-white pl-4 pr-10 text-[15px] font-semibold outline-none focus-visible:shadow-[3px_3px_0_#F2B33D]`}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2" />
          </div>
        </section>

        {/* Category chips */}
        <div
          role="tablist"
          aria-label="Categories"
          className="mt-5 flex gap-3 overflow-x-auto pb-3 pr-1 pt-1"
        >
          {["all", ...categories].map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(c)}
                className={`${ink} shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-all ${
                  active
                    ? "bg-[#26213A] text-white shadow-[3px_3px_0_#F2B33D]"
                    : "bg-white shadow-[3px_3px_0_#26213A] hover:bg-[#F2B33D]/40 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                }`}
              >
                {c === "all" ? "All" : c}
              </button>
            );
          })}
        </div>

        {/* Results header */}
        <div className="mt-8 flex items-end justify-between gap-4">
          <h2 className={`${display.className} text-3xl`}>
            {visible.length} delicious {visible.length === 1 ? "find" : "finds"}
          </h2>
          <p className="hidden text-sm font-semibold text-[#26213A]/60 sm:block">
            Made by your neighborhood pizzerias
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <ul className="mt-6 grid items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <li
                key={i}
                className={`${ink} h-80 animate-pulse rounded-3xl bg-[#26213A]/10`}
              />
            ))}
          </ul>
        ) : visible.length === 0 ? (
          <div
            className={`${ink} mt-6 grid place-items-center gap-3 rounded-3xl bg-[#FFFCF6] px-6 py-16 text-center shadow-[8px_8px_0_#26213A]`}
          >
            <span
              className={`${ink} grid size-14 -rotate-6 place-items-center rounded-2xl bg-[#F2B33D] shadow-[3px_3px_0_#26213A]`}
            >
              <SearchX className="size-7" />
            </span>
            <p className={`${display.className} text-2xl`}>Nothing here yet</p>
            <p className="max-w-sm text-[15px] text-[#26213A]/70">
              Try a different search, location, or category.
            </p>
          </div>
        ) : (
          <ul className="mt-6 grid items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {visible.map((item) => {
              const isLiked = liked.has(item._id);
              return (
                <li
                  key={item._id}
                  className={`${ink} group flex flex-col overflow-hidden rounded-3xl bg-[#FFFCF6] shadow-[6px_6px_0_#26213A] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[9px_9px_0_#26213A]`}
                >
                  <div className="relative aspect-[4/3] w-full shrink-0 border-b-2 border-[#26213A] bg-[#F2B33D]/30">
                    {item.image?.trim() ? (
                      <Image
                        src={item.image.trim()}
                        alt={item.name}
                        width={600}
                        height={600}
                        quality={75}
                        className="absolute inset-0 size-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
                        No Image Available
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleLike(item._id)}
                      aria-pressed={isLiked}
                      aria-label={
                        isLiked
                          ? `Remove ${item.name} from favorites`
                          : `Save ${item.name} to favorites`
                      }
                      className={`${ink} absolute right-3 top-3 grid size-10 place-items-center rounded-full shadow-[2px_2px_0_#26213A] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                        isLiked ? "bg-[#E8452C] text-white" : "bg-white"
                      }`}
                    >
                      <Heart
                        className="size-5"
                        fill={isLiked ? "currentColor" : "none"}
                      />
                    </button>

                    <span
                      className={`${ink} absolute bottom-3 left-3 rounded-full bg-[#F2B33D] px-3 py-1 text-xs font-extrabold shadow-[2px_2px_0_#26213A]`}
                    >
                      {item.category}
                    </span>

                    <span
                      className={`${display.className} ${ink} absolute -bottom-0 right-3 translate-y-1/2 rotate-3 rounded-xl bg-[#E8452C] px-3 py-1.5 text-lg text-white shadow-[3px_3px_0_#26213A]`}
                    >
                      ${Number(item.price ?? 0).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 pt-7">
                    <h3
                      className={`${display.className} line-clamp-2 min-h-[3.25rem] text-2xl leading-tight`}
                    >
                      {item.name}
                    </h3>

                    <div className="mb-5 mt-4 flex items-center gap-3">
                      <span
                        className={`${ink} grid size-10 shrink-0 place-items-center rounded-full bg-[#F2B33D] text-sm font-extrabold`}
                      >
                        {item.pizzeria?.charAt(0) ?? "?"}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">
                          {item.pizzeria ?? "Unknown pizzeria"}
                        </p>
                        <p className="flex items-center gap-1 text-xs text-[#26213A]/70">
                          <MapPin className="size-3.5 shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </p>
                      </div>
                      <span
                        className={`${ink} flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-sm font-bold`}
                      >
                        <Star
                          className="size-4 text-[#F2B33D]"
                          fill="currentColor"
                          strokeWidth={1.5}
                        />
                        {(item.rating ?? 0).toFixed(1)}
                      </span>
                    </div>

                    <Link
                      href={`/menu/${item._id}`}
                      className="mt-auto flex items-center justify-between rounded-xl border-t-2 border-dashed border-[#26213A]/25 pt-4 text-[15px] font-extrabold text-[#E8452C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8452C]"
                    >
                      View details
                      <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
