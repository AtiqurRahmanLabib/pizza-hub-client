"use client";

// Route: app/dashboard/vendor/add-menu-item/page.tsx
// Submits the form to your API through postItem().

import { useState } from "react";
import Link from "next/link";
import { Bowlby_One, Figtree } from "next/font/google";
import { ArrowRight, ChevronDown, CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { postItem } from "@/lib/actions/postItems";

const display = Bowlby_One({ subsets: ["latin"], weight: "400" });
const body = Figtree({ subsets: ["latin"] });

const categories = [
  "Classic Pizzas",
  "Vegetarian Pizzas",
  "Meat Lovers",
  "Specialty / Gourmet Pizzas",
  "Sides & Appetizers",
  "Beverages & Desserts",
];

const ink = "border-2 border-[#26213A]";
const field =
  "h-10 rounded-lg border-2 border-[#26213A] bg-white px-3 text-sm shadow-none placeholder:text-[#26213A]/40 " +
  "focus-visible:border-[#26213A] focus-visible:ring-0 focus-visible:shadow-[3px_3px_0_#F2B33D]";

export default function AddMenuItemPage() {
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());

    const item = {
      name: String(raw.name).trim(),
      category: String(raw.category),
      description: String(raw.description).trim(),
      price: Number(raw.price),
      location: String(raw.location).trim(),
      image: String(raw.image || "").trim(),
    };

    if (!Number.isFinite(item.price) || item.price <= 0) {
      toast.add({
        type: "error",
        title: "Invalid price",
        description: "Please enter a valid price.",
      });
      return;
    }

    setPending(true);

    try {
      await postItem(item);

      toast.add({
        type: "success",
        title: "Submitted for review!",
        description: "Your menu item is waiting for admin approval.",
      });

      form.reset();
    } catch (err) {
      toast.add({
        type: "error",
        title: "Could not add item",
        description:
          err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      className={`${body.className} min-h-screen bg-[#FFF4E2] px-5 py-8 text-[#26213A] sm:px-8 lg:px-10`}
    >
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span
            className={`${ink} inline-block -rotate-2 rounded-full bg-[#F2B33D] px-3 py-1 text-xs font-extrabold uppercase tracking-widest shadow-[2px_2px_0_#26213A]`}
          >
            Your pizzeria
          </span>
          <h1
            className={`${display.className} mt-3 text-3xl leading-[1.05] sm:text-4xl`}
          >
            Add Menu Item
          </h1>
          <p className="mt-2 text-sm font-medium text-[#26213A]/70">
            Here’s what’s happening at your shop today.
          </p>
        </div>

        <Link
          href="/dashboard/vendor/settings"
          className={`${ink} inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-sm font-bold shadow-[2px_2px_0_#26213A] transition-all hover:bg-[#F2B33D]/40 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`}
        >
          <CircleUserRound className="size-4" />
          Edit profile
        </Link>
      </header>

      {/* Form card */}
      <section
        className={`${ink} mt-7 w-full max-w-2xl rounded-2xl bg-[#FFFCF6] p-5 shadow-[5px_5px_0_#26213A] sm:p-6`}
      >
        <h2 className={`${display.className} text-xl`}>
          Add something delicious
        </h2>
        <p className="mt-1.5 text-sm font-medium text-[#26213A]/65">
          Your menu item will be reviewed before it appears to customers.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold">
                Item name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Sunday Sausage"
                required
                className={field}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-bold">
                Category
              </Label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  defaultValue={categories[0]}
                  className={`${ink} h-10 w-full cursor-pointer appearance-none rounded-lg bg-white pl-3 pr-9 text-sm font-semibold outline-none focus-visible:shadow-[3px_3px_0_#F2B33D]`}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-bold">
              Description
            </Label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="What makes it special?"
              required
              className="w-full resize-none rounded-lg border-2 border-[#26213A] bg-white px-3 py-2 text-sm outline-none placeholder:text-[#26213A]/40 focus-visible:shadow-[3px_3px_0_#F2B33D]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-bold">
                Price ($)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                required
                className={field}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-bold">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="City, State"
                required
                className={field}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-bold">
              Image URL{" "}
              <span className="font-medium text-[#26213A]/55">(optional)</span>
            </Label>
            <Input
              id="image"
              name="image"
              type="url"
              placeholder="Paste an image link; sample photo used if blank"
              className={field}
            />
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="group h-10 rounded-lg border-2 border-[#26213A] bg-[#E8452C] px-5 text-sm font-extrabold text-white shadow-[3px_3px_0_#26213A] transition-all hover:bg-[#E8452C] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:opacity-60"
          >
            {pending ? "Submitting…" : "Submit for review"}
            {!pending && (
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            )}
          </Button>
        </form>
      </section>
    </div>
  );
}
