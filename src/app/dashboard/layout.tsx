import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      {/* flex-1 + min-w-0 makes the content fill all the space next to the sidebar */}
      <div className="flex min-w-0 flex-1 flex-col bg-[#FFF4E2]">
        <div className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b-2 border-[#26213A] bg-[#FFF4E2]/95 px-4 backdrop-blur sm:px-6">
          <SidebarTrigger className="size-9 rounded-lg border-2 border-[#26213A] bg-white text-[#26213A] shadow-[2px_2px_0_#26213A] transition-all hover:bg-[#F2B33D]/40 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none" />
          <span className="text-sm font-extrabold uppercase tracking-widest text-[#26213A]/60">
            Dashboard
          </span>
        </div>

        {children}
      </div>
    </SidebarProvider>
  );
}
