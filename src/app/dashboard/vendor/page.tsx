// Server component. Route: app/dashboard/vendor/page.tsx  ->  /dashboard/vendor
// Nothing is mocked: replace `getVendorDashboard` with your API call.

import Link from "next/link";
import { Bowlby_One, Figtree } from "next/font/google";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  CircleUserRound,
  Pizza,
  Sparkles,
  UtensilsCrossed,
  Zap,
  type LucideIcon,
} from "lucide-react";

const display = Bowlby_One({ subsets: ["latin"], weight: "400" });
const body = Figtree({ subsets: ["latin"] });

type RecentOrder = {
  _id: string;
  customerName: string;
  itemName: string;
  status: string;
  total: number;
  createdAt: string;
};

type VendorDashboardData = {
  vendorName?: string;
  menuItemsCount: number;
  activeItemsCount: number;
  pendingOrdersCount: number;
  acceptedOrdersCount: number;
  isPremium: boolean;
  recentOrders: RecentOrder[];
};

// TODO: replace with your real API call
async function getVendorDashboard(): Promise<VendorDashboardData> {
  return {
    menuItemsCount: 0,
    activeItemsCount: 0,
    pendingOrdersCount: 0,
    acceptedOrdersCount: 0,
    isPremium: false,
    recentOrders: [],
  };
}

const ink = "border-2 border-[#26213A]";

export default async function VendorDashboardPage() {
  const data = await getVendorDashboard();

  const stats: {
    label: string;
    value: number;
    hint: string;
    icon: LucideIcon;
    tone: string;
  }[] = [
    {
      label: "Menu items",
      value: data.menuItemsCount,
      hint: "Your full menu",
      icon: UtensilsCrossed,
      tone: "bg-[#F2B33D]",
    },
    {
      label: "Active items",
      value: data.activeItemsCount,
      hint: data.isPremium ? "Unlimited on Premium" : "Live on your menu",
      icon: Zap,
      tone: "bg-white",
    },
    {
      label: "Pending orders",
      value: data.pendingOrdersCount,
      hint: "Waiting for your review",
      icon: Clock,
      tone: "bg-[#E8452C] text-white",
    },
    {
      label: "Accepted orders",
      value: data.acceptedOrdersCount,
      hint: "On the way to happy",
      icon: CheckCircle2,
      tone: "bg-white",
    },
  ];

  return (
    <main
      className={`${body.className} min-h-screen bg-[#FFF4E2] px-5 py-10 text-[#26213A] sm:px-8 lg:px-12`}
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
            className={`${display.className} mt-4 text-4xl leading-[1.05] sm:text-5xl`}
          >
            {data.vendorName ? `Hey ${data.vendorName},` : "Good vendor,"}
            <br />
            here’s the scoop.
          </h1>
          <p className="mt-3 text-[15px] font-medium text-[#26213A]/70">
            Here’s what’s happening at your shop today.
          </p>
        </div>

        <Link
          href="/dashboard/vendor/settings"
          className={`${ink} inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold shadow-[3px_3px_0_#26213A] transition-all hover:bg-[#F2B33D]/40 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`}
        >
          <CircleUserRound className="size-4" />
          Edit profile
        </Link>
      </header>

      {/* Stats */}
      <section className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, hint, icon: Icon, tone }) => (
          <div
            key={label}
            className={`${ink} ${tone} relative rounded-2xl p-5 shadow-[5px_5px_0_#26213A]`}
          >
            <span
              className={`${ink} absolute right-4 top-4 grid size-9 rotate-6 place-items-center rounded-xl bg-white text-[#26213A] shadow-[2px_2px_0_#26213A]`}
            >
              <Icon className="size-[18px]" />
            </span>
            <p className="text-sm font-bold">{label}</p>
            <p className={`${display.className} mt-3 text-5xl leading-none`}>
              {value}
            </p>
            <p className="mt-3 text-xs font-semibold opacity-70">{hint}</p>
          </div>
        ))}
      </section>

      {/* Orders + plan */}
      <section className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_380px]">
        <div
          className={`${ink} rounded-3xl bg-[#FFFCF6] p-6 shadow-[8px_8px_0_#26213A] sm:p-8`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className={`${display.className} text-2xl`}>
                Recent customer orders
              </h2>
              <p className="mt-1 text-sm font-medium text-[#26213A]/65">
                A quick look at what’s happening.
              </p>
            </div>
            <Link
              href="/dashboard/vendor/orders"
              className="group flex shrink-0 items-center gap-1.5 text-sm font-extrabold text-[#E8452C]"
            >
              View all
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {data.recentOrders.length === 0 ? (
            <div className="mt-6 grid place-items-center gap-2 rounded-2xl border-2 border-dashed border-[#26213A]/30 px-6 py-12 text-center">
              <span
                className={`${ink} grid size-12 -rotate-6 place-items-center rounded-2xl bg-[#F2B33D] shadow-[3px_3px_0_#26213A]`}
              >
                <Pizza className="size-6" />
              </span>
              <p className={`${display.className} mt-2 text-xl`}>
                Nothing on the table just yet.
              </p>
              <p className="text-sm text-[#26213A]/65">
                Orders from your customers will show up here.
              </p>
            </div>
          ) : (
            <ul className="mt-6 space-y-3">
              {data.recentOrders.map((order) => (
                <li
                  key={order._id}
                  className={`${ink} flex flex-wrap items-center gap-3 rounded-2xl bg-white p-3.5`}
                >
                  <span
                    className={`${ink} grid size-10 shrink-0 place-items-center rounded-full bg-[#F2B33D] text-sm font-extrabold`}
                  >
                    {order.customerName.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">
                      {order.itemName}
                    </p>
                    <p className="truncate text-xs text-[#26213A]/65">
                      {order.customerName} ·{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`${ink} rounded-full bg-[#F2B33D] px-2.5 py-0.5 text-xs font-extrabold capitalize`}
                  >
                    {order.status}
                  </span>
                  <span className={`${display.className} text-base`}>
                    ${order.total.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Plan card */}
        <aside
          className={`${ink} relative overflow-hidden rounded-3xl bg-[#26213A] p-6 text-white shadow-[8px_8px_0_#F2B33D] sm:p-8`}
        >
          <span
            className={`${ink} grid size-11 -rotate-6 place-items-center rounded-xl bg-[#F2B33D] text-[#26213A]`}
          >
            <Sparkles className="size-5" />
          </span>
          <p className="mt-5 text-xs font-extrabold uppercase tracking-widest text-[#F2B33D]">
            Grow your pizzeria
          </p>
          <h2 className={`${display.className} mt-2 text-3xl leading-tight`}>
            {data.isPremium ? "You’re on the Premium plan." : "Go Premium."}
          </h2>
          <p className="mt-3 text-sm font-medium text-white/75">
            {data.isPremium
              ? "Enjoy unlimited items, a premium badge, and featured placement."
              : "Unlock unlimited items, a premium badge, and featured placement."}
          </p>
          <Link
            href="/dashboard/vendor/subscription"
            className={`${ink} group mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F2B33D] px-4 py-2.5 text-sm font-extrabold text-[#26213A] transition-all hover:brightness-95`}
          >
            {data.isPremium ? "View plan" : "Upgrade now"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </aside>
      </section>
    </main>
  );
}
