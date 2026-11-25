"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bowlby_One, Figtree } from "next/font/google";
import { useSession } from "@/lib/auth-client";
import type { UserRole } from "@/lib/types/userRole";

import {
  LayoutDashboard,
  ShoppingBag,
  Pizza,
  Plus,
  ClipboardList,
  Crown,
  Users,
  Store,
  Receipt,
  BarChart3,
  Settings,
  CircleUserRound,
  type LucideIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const display = Bowlby_One({ subsets: ["latin"], weight: "400" });
const body = Figtree({ subsets: ["latin"] });

type MenuItem = {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
};

const menuItemsByRole: Record<UserRole, MenuItem[]> = {
  customer: [
    { id: "overview", name: "Overview", url: "/dashboard/customer", icon: LayoutDashboard },
    { id: "my-orders", name: "My Orders", url: "/dashboard/customer/orders", icon: ShoppingBag },
  ],

  vendor: [
    { id: "overview", name: "Overview", url: "/dashboard/vendor", icon: LayoutDashboard },
    { id: "my-menu-items", name: "My Menu Items", url: "/dashboard/vendor/menu-items", icon: Pizza },
    { id: "add-menu-item", name: "Add Menu Item", url: "/dashboard/vendor/add-menu-items", icon: Plus },
    { id: "customer-orders", name: "Customer Orders", url: "/dashboard/vendor/orders", icon: ClipboardList },
    { id: "subscription", name: "Subscription", url: "/dashboard/vendor/subscription", icon: Crown },
  ],

  admin: [
    { id: "overview", name: "Overview", url: "/dashboard/admin", icon: LayoutDashboard },
    { id: "users", name: "Manage Users", url: "/dashboard/admin/users", icon: Users },
    { id: "vendors", name: "Manage Vendors", url: "/dashboard/admin/vendors", icon: Store },
    { id: "menu-items", name: "Manage Menu Items", url: "/dashboard/admin/menu-items", icon: Pizza },
    { id: "orders", name: "Manage Orders", url: "/dashboard/admin/orders", icon: ClipboardList },
    { id: "transactions", name: "Transactions", url: "/dashboard/admin/transactions", icon: Receipt },
    { id: "reports", name: "Reports & Analytics", url: "/dashboard/admin/reports", icon: BarChart3 },
    { id: "settings", name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
};

const settingsUrlByRole: Record<UserRole, string> = {
  customer: "/dashboard/customer/settings",
  vendor: "/dashboard/vendor/settings",
  admin: "/dashboard/admin/settings",
};

const ink = "border-2 border-[#26213A]";
const panel = "bg-[#FFF4E2] text-[#26213A]";

export function AppSidebar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();

  const role = session?.user?.role as UserRole | undefined;

  // Sidebar shell styles (kept in one place so loading state matches)
  const shell = `${body.className} border-r-2 border-[#26213A] [&_[data-sidebar=sidebar]]:bg-[#FFF4E2]`;

  if (isPending) {
    return (
      <Sidebar className={shell}>
        <SidebarContent className={`${panel} gap-3 p-4`}>
          <div className={`${ink} h-14 animate-pulse rounded-2xl bg-[#26213A]/10`} />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded-xl bg-[#26213A]/10" />
          ))}
        </SidebarContent>
      </Sidebar>
    );
  }

  if (!role || !menuItemsByRole[role]) {
    return null;
  }

  const menuItems = menuItemsByRole[role];
  const userName = session?.user?.name || role;
  const initial = userName.charAt(0).toUpperCase();

  return (
    <Sidebar className={shell}>
      {/* Brand + user */}
      <SidebarHeader className={`${panel} gap-4 p-4`}>
        <div className="flex items-center gap-2.5">
          <span
            className={`${ink} grid size-9 -rotate-6 place-items-center rounded-xl bg-[#E8452C] text-white shadow-[2px_2px_0_#26213A]`}
          >
            <Pizza className="size-5" />
          </span>
          <span className={`${display.className} text-xl leading-none`}>
            PizzaHub
          </span>
        </div>

        <div
          className={`${ink} flex items-center gap-3 rounded-2xl bg-[#FFFCF6] p-2.5 shadow-[3px_3px_0_#26213A]`}
        >
          <span
            className={`${ink} grid size-10 shrink-0 place-items-center rounded-full bg-[#F2B33D] text-sm font-extrabold`}
          >
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{userName}</p>
            <span
              className={`${ink} mt-0.5 inline-block rounded-full bg-white px-2 py-px text-[10px] font-extrabold uppercase tracking-wide`}
            >
              {role}
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className={panel}>
        <SidebarGroup className="px-4 py-2">
          <SidebarGroupLabel className="mb-1 h-6 px-1 text-[11px] font-extrabold uppercase tracking-widest text-[#26213A]/55">
            Workspace
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.url ||
                  (item.url !== `/dashboard/${role}` &&
                    pathname.startsWith(`${item.url}/`));

                return (
                  <SidebarMenuItem key={item.id}>
                    <Link
                      href={item.url}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl border-2 px-3 py-2 text-sm font-bold transition-all ${
                        isActive
                          ? "border-[#26213A] bg-[#F2B33D] shadow-[3px_3px_0_#26213A]"
                          : "border-transparent hover:border-[#26213A] hover:bg-[#F2B33D]/30"
                      }`}
                    >
                      <Icon className="size-[18px] shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className={`${panel} gap-3 p-4`}>
        <div
          className={`${ink} -rotate-1 rounded-2xl bg-[#E8452C] p-3.5 text-white shadow-[3px_3px_0_#26213A]`}
        >
          <Pizza className="mb-1.5 size-5" />
          <p className={`${display.className} text-sm leading-tight`}>
            Made for the neighborhood
          </p>
          <p className="mt-1 text-xs font-medium text-white/85">
            Thanks for being part of PizzaHub.
          </p>
        </div>

        <Link
          href={settingsUrlByRole[role]}
          className={`${ink} flex items-center gap-2.5 rounded-xl bg-white px-3 py-2 text-sm font-bold shadow-[3px_3px_0_#26213A] transition-all hover:bg-[#F2B33D]/40 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`}
        >
          <CircleUserRound className="size-[18px]" />
          Profile Settings
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}