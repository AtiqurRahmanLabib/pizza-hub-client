// Server component. Route: app/menu/[id]/page.tsx  ->  /menu/<_id>

import Link from "next/link";
import { notFound } from "next/navigation";
import { Bowlby_One, Figtree } from "next/font/google";
import { ArrowLeft, BadgeCheck, MapPin, Star } from "lucide-react";

import type { MenuItem } from "@/lib/types/menu-item";

import { getMenuItemById } from "@/lib/api/menuItemsApi";
import OrderForm from "@/app/components/Forms/order-Form";

const display = Bowlby_One({ subsets: ["latin"], weight: "400" });
const body = Figtree({ subsets: ["latin"] });

const ink = "border-2 border-[#26213A]";

export default async function MenuItemDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item: MenuItem | null = await getMenuItemById(id);
  if (!item) notFound();

  return (
    <main
      className={`${body.className} min-h-screen bg-[#FFF4E2] px-5 py-10 text-[#26213A] sm:px-8 lg:px-12`}
    >
      <Link
        href="/menu-items"
        className={`${ink} inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-[3px_3px_0_#26213A] transition-all hover:bg-[#F2B33D]/40 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`}
      >
        <ArrowLeft className="size-4" />
        Back to menu
      </Link>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[440px_1fr] lg:gap-12 xl:grid-cols-[500px_1fr]">
        {/* Image (smaller, sticky on desktop) */}
        <div
          className={`${ink} relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[#F2B33D]/30 shadow-[8px_8px_0_#26213A] lg:sticky lg:top-8 lg:aspect-square`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 size-full object-cover"
          />
          <span
            className={`${ink} absolute left-4 top-4 -rotate-3 rounded-full bg-[#F2B33D] px-4 py-1.5 text-sm font-extrabold shadow-[3px_3px_0_#26213A]`}
          >
            {item.category}
          </span>
          <span
            className={`${ink} absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-extrabold shadow-[3px_3px_0_#26213A]`}
          >
            <Star
              className="size-4 text-[#F2B33D]"
              fill="currentColor"
              strokeWidth={1.5}
            />
            {item.rating.toFixed(1)}
            <span className="font-semibold text-[#26213A]/60">
              · {item.reviewCount}+ reviews
            </span>
          </span>
        </div>

        {/* Info + order */}
        <div className="min-w-0">
          <h1
            className={`${display.className} text-4xl leading-[1.05] sm:text-5xl`}
          >
            {item.name}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#26213A]/80">
            {item.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span
              className={`${ink} flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-sm font-bold`}
            >
              <MapPin className="size-4 text-[#E8452C]" />
              {item.location}
            </span>
            <span
              className={`${ink} flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-sm font-bold`}
            >
              <BadgeCheck className="size-4 text-[#E8452C]" />
              {item.pizzeria}
            </span>
          </div>

          <div
            className={`${ink} mt-8 rounded-3xl bg-[#FFFCF6] p-6 shadow-[8px_8px_0_#26213A] sm:p-8`}
          >
            <div className="flex items-end justify-between gap-4">
              <p className={`${display.className} text-4xl`}>
                ${item.price.toFixed(2)}
              </p>
              <p className="text-sm font-semibold text-[#26213A]/60">
                Made fresh to order
              </p>
            </div>

            <OrderForm itemId={item._id} price={item.price} />
          </div>
        </div>
      </div>
    </main>
  );
}