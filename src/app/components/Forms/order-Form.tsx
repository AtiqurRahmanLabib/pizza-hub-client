"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";

const field =
  "h-12 rounded-xl border-2 border-[#26213A] bg-white px-4 text-[15px] shadow-none placeholder:text-[#26213A]/40 " +
  "focus-visible:border-[#26213A] focus-visible:ring-0 focus-visible:shadow-[3px_3px_0_#F2B33D]";

export default function OrderForm({
  itemId,
  price,
}: {
  itemId: string;
  price: number;
}) {
  const [pending, setPending] = useState(false);
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const order = {
      menuItemId: itemId,
      deliveryDate: String(form.get("deliveryDate")),
      deliveryAddress: String(form.get("deliveryAddress")),
      instructions: String(form.get("instructions") ?? ""),
    };

    setPending(true);
    try {
      // TODO: call your order API with `order`
      void order;
      toast.add({
        type: "success",
        title: "Order placed!",
        description: `Your pizza is on its way on ${order.deliveryDate}.`,
      });
      e.currentTarget.reset();
    } catch {
      toast.add({
        type: "error",
        title: "Could not place order",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
      <div className="space-y-2">
        <Label htmlFor="deliveryDate" className="text-sm font-bold">
          Delivery date
        </Label>
        <Input
          id="deliveryDate"
          name="deliveryDate"
          type="date"
          min={today}
          required
          className={field}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deliveryAddress" className="text-sm font-bold">
          Delivery address
        </Label>
        <Input
          id="deliveryAddress"
          name="deliveryAddress"
          autoComplete="street-address"
          placeholder="Street, apartment, city"
          required
          className={field}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions" className="text-sm font-bold">
          Special instructions{" "}
          <span className="font-medium text-[#26213A]/55">(optional)</span>
        </Label>
        <textarea
          id="instructions"
          name="instructions"
          rows={3}
          placeholder="Extra crispy, please…"
          className="w-full resize-none rounded-xl border-2 border-[#26213A] bg-white px-4 py-3 text-[15px] outline-none placeholder:text-[#26213A]/40 focus-visible:shadow-[3px_3px_0_#F2B33D]"
        />
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="group h-14 w-full rounded-xl border-2 border-[#26213A] bg-[#E8452C] text-base font-extrabold text-white shadow-[5px_5px_0_#26213A] transition-all hover:bg-[#E8452C] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none disabled:opacity-60"
      >
        {pending ? "Placing order…" : `Place order · $${price.toFixed(2)}`}
        {!pending && (
          <ArrowRight className="ml-1 size-5 transition-transform group-hover:translate-x-1" />
        )}
      </Button>
    </form>
  );
}