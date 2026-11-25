"use client";

// Setup (once):
//   npx shadcn@latest add button input label
//   npm i lucide-react
//
// Save as app/sign-up/page.tsx (or import <SignUp /> anywhere).
// Better Auth is wired through lib/auth-client.ts.
// The selected role is sent as `requestedRole`; the server assigns the
// protected `role` field in a database hook. "admin" can only be granted
// server-side, never through public sign-up.

import { useState } from "react";
import Link from "next/link";
import { Bowlby_One, Figtree } from "next/font/google";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Pizza,
  Store,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const display = Bowlby_One({ subsets: ["latin"], weight: "400" });
const body = Figtree({ subsets: ["latin"] });

type Role = "customer" | "vendor";

const roles: {
  value: Role;
  title: string;
  hint: string;
  icon: typeof Pizza;
}[] = [
  {
    value: "customer",
    title: "A pizza lover",
    hint: "Customer",
    icon: UtensilsCrossed,
  },
  { value: "vendor", title: "A pizzeria owner", hint: "Vendor", icon: Store },
];

const field =
  "h-12 rounded-xl border-2 border-[#26213A] bg-white px-4 text-[15px] shadow-none placeholder:text-[#26213A]/40 " +
  "focus-visible:border-[#26213A] focus-visible:ring-0 focus-visible:shadow-[3px_3px_0_#F2B33D]";

const social =
  "h-12 rounded-xl border-2 border-[#26213A] bg-white text-[15px] font-bold text-[#26213A] shadow-[3px_3px_0_#26213A] " +
  "transition-all hover:bg-[#F2B33D]/30 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.94H1.3v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.3A7.2 7.2 0 0 1 4.91 12c0-.8.14-1.57.38-2.3v-3.1H1.3A12 12 0 0 0 0 12c0 1.94.46 3.77 1.3 5.4l3.99-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.3 6.6l3.99 3.1C6.23 6.86 8.88 4.75 12 4.75z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>("customer");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as unknown as SignUpData;
    const { data: formData, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      requestedRole: role,
      callbackURL: "/",
    });
    if (formData) {
      router.push("/");
      toast.add({ type: "success", title: "User created successfully!" });
    }
    if (error) {
      toast.add({
        type: "error",
        title: "Sign up failed",
        description: error.message ?? "Something went wrong. Please try again.",
      });
    }
  }

  async function handleSocial(provider: "google" | "github") {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
      additionalData: { requestedRole: role },
    });
    if (error) {
      toast.add({
        type: "error",
        title: "Sign up failed",
        description: error.message ?? "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <main
      className={`${body.className} flex min-h-screen items-center justify-center bg-[#FFF4E2] p-5 py-10 text-[#26213A]`}
    >
      <div className="relative w-full max-w-md">
        <span
          className={`${display.className} absolute -right-3 -top-5 z-10 rotate-6 rounded-full border-2 border-[#26213A] bg-[#F2B33D] px-3.5 py-1.5 text-xs shadow-[3px_3px_0_#26213A]`}
        >
          Pull up a chair
        </span>

        <div className="rounded-3xl border-2 border-[#26213A] bg-[#FFFCF6] p-7 shadow-[8px_8px_0_#26213A] sm:p-9">
          <div className="flex items-center justify-between">
            <span className="grid size-12 -rotate-6 place-items-center rounded-2xl border-2 border-[#26213A] bg-[#E8452C] text-white shadow-[3px_3px_0_#26213A]">
              <Pizza className="size-6" />
            </span>
            <Link
              href="/"
              aria-label="Close"
              className="grid size-10 place-items-center rounded-full border-2 border-[#26213A] bg-white transition-colors hover:bg-[#F2B33D]/40"
            >
              <X className="size-5" />
            </Link>
          </div>

          <h1 className={`${display.className} mt-8 text-4xl leading-none`}>
            Let’s make it official
          </h1>
          <p className="mt-3 text-[15px] text-[#26213A]/70">
            Create your PizzaHub account in under a minute.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold">
                Full name
              </Label>
              <Input
                id="name"
                autoComplete="name"
                placeholder="Your name"
                name="name"
                required
                className={field}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                name="email"
                required
                className={field}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-bold">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="6+ characters, uppercase & lowercase"
                  name="password"
                  required
                  minLength={6}
                  pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="At least 6 characters with an uppercase and a lowercase letter"
                  className={`${field} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#26213A]/60 hover:text-[#26213A]"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-bold">I’m here as</legend>
              <div className="grid grid-cols-2 gap-3 pt-1">
                {roles.map(({ value, title, hint, icon: Icon }) => {
                  const active = role === value;
                  return (
                    <label
                      key={value}
                      className={`relative flex cursor-pointer flex-col gap-2 rounded-xl border-2 border-[#26213A] p-3.5 transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#E8452C] has-[:focus-visible]:ring-offset-2 ${
                        active
                          ? "bg-[#F2B33D] shadow-[3px_3px_0_#26213A]"
                          : "bg-white hover:bg-[#F2B33D]/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={value}
                        checked={active}
                        onChange={() => setRole(value)}
                        className="sr-only"
                      />
                      <Icon className="size-5" />
                      <span className="text-sm font-bold leading-tight">
                        {title}
                      </span>
                      <span className="text-xs text-[#26213A]/70">{hint}</span>
                      {active && (
                        <span className="absolute right-2.5 top-2.5 grid size-5 place-items-center rounded-full bg-[#26213A] text-white">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <Button
              type="submit"
              className="group h-14 w-full rounded-xl border-2 border-[#26213A] bg-[#E8452C] text-base font-extrabold text-white shadow-[5px_5px_0_#26213A] transition-all hover:bg-[#E8452C] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
            >
              Create account
              <ArrowRight className="ml-1 size-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          <div className="my-7 flex items-center gap-3 text-sm font-semibold text-[#26213A]/60">
            <span className="h-0.5 flex-1 rounded bg-[#26213A]/15" />
            or sign up with
            <span className="h-0.5 flex-1 rounded bg-[#26213A]/15" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocial("google")}
              className={social}
            >
              <GoogleIcon />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocial("github")}
              className={social}
            >
              <GitHubIcon />
              GitHub
            </Button>
          </div>

          <p className="mt-8 text-center text-[15px]">
            Already one of us?{" "}
            <Link
              href="/sign-in"
              className="font-bold underline decoration-[#E8452C] decoration-2 underline-offset-4"
            >
              Sign in
            </Link>
          </p>
          <p className="mt-3 text-center text-xs text-[#26213A]/55">
            Admin access is reserved; it can’t be created through public
            registration.
          </p>
        </div>
      </div>
    </main>
  );
}
