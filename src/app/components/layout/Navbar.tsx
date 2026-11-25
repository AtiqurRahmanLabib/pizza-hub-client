"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type User = {
  name: string;
  email: string;
  role: string;
};

type NavbarProps = {
  user?: User | null;
  cartCount?: number;
  onSignOut?: () => void;
};

const links = [
  { href: "/", label: "Home", authOnly: false },
  { href: "/menu-items", label: "Browse menu", authOnly: false },
  { href: "/dashboard", label: "Dashboard", authOnly: true },
];

const dropdownItem =
  "block rounded-xl px-4 py-2.5 text-sm font-semibold text-[#2B1A12] transition hover:bg-[#FFF4E3]";

export default function Navbar({ cartCount = 0, onSignOut }: NavbarProps) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const [userOpen, setUserOpen] = useState(false); // user dropdown
  const userRef = useRef<HTMLDivElement>(null);

  const visibleLinks = links.filter((l) => !l.authOnly || user);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setUserOpen(false);
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full bg-white/90 px-2 shadow-lg ring-1 ring-black/5 backdrop-blur-md"
      >
        {/* ---------- Logo ---------- */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 pl-1"
        >
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

        {/* ---------- Desktop links ---------- */}
        <ul className="hidden items-center gap-1 md:flex">
          {visibleLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  isActive(l.href)
                    ? "bg-[#FFF4E3] text-[#C8412B]"
                    : "text-[#5B4636] hover:bg-[#FFF4E3] hover:text-[#2B1A12]"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ---------- Right side ---------- */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Cart, ${cartCount} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#2B1A12] transition hover:bg-[#FFF4E3]"
          >
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
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C8412B] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User dropdown OR auth buttons */}
          {user ? (
            <div ref={userRef} className="relative">
              <button
                type="button"
                onClick={() => setUserOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={userOpen}
                className="flex items-center gap-2 rounded-full bg-[#FFF4E3] py-1 pl-1 pr-3 transition hover:bg-[#FBE7C8]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6C453] text-sm font-black text-[#2B1A12]">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="hidden max-w-24 truncate text-sm font-bold text-[#2B1A12] sm:block">
                  {user.name}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 text-[#5B4636] transition-transform ${
                    userOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {userOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-3 w-64 rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5"
                >
                  <div className="rounded-xl bg-[#FFF4E3] px-4 py-3">
                    <p className="truncate text-sm font-black text-[#2B1A12]">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-[#5B4636]">
                      {user.email}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#C8412B]">
                      {user.role}
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      role="menuitem"
                      onClick={() => setUserOpen(false)}
                      className={dropdownItem}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      role="menuitem"
                      onClick={() => setUserOpen(false)}
                      className={dropdownItem}
                    >
                      Profile settings
                    </Link>
                  </div>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setUserOpen(false);
                      handleSignOut();
                    }}
                    className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-[#C8412B] transition hover:bg-[#FDE3DC]"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-1 sm:flex">
              <Link
                href="/sign-in"
                className="rounded-full px-4 py-2 text-sm font-bold text-[#5B4636] transition hover:bg-[#FFF4E3]"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-full bg-[#C8412B] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#A93421]"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#2B1A12] transition hover:bg-[#FFF4E3] md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ---------- Mobile panel ---------- */}
      {menuOpen && (
        <div className="mx-auto mt-2 max-w-5xl rounded-3xl bg-white p-3 shadow-xl ring-1 ring-black/5 md:hidden">
          <ul className="flex flex-col gap-1">
            {visibleLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-sm font-bold ${
                    isActive(l.href)
                      ? "bg-[#FFF4E3] text-[#C8412B]"
                      : "text-[#5B4636]"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {!user && (
              <li className="mt-1 flex gap-2">
                <Link
                  href="/sign-in"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-2xl bg-[#FFF4E3] px-4 py-3 text-center text-sm font-bold text-[#2B1A12]"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-2xl bg-[#C8412B] px-4 py-3 text-center text-sm font-bold text-white"
                >
                  Sign up
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
