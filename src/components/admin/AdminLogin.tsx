"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";

export default function AdminLogin({
  onLogin,
}: {
  onLogin: (remember: boolean) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username.trim() === "admin" && password === "admin") {
      setError("");
      onLogin(remember);
      return;
    }
    setError("Incorrect username or password. Try the demo credentials shown below.");
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-space-md py-space-2xl bg-surface-container-low">
      <div className="w-full max-w-[440px]">
        <div className="flex justify-center mb-space-lg">
          <Link href="/vi" className="inline-flex items-center gap-space-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Logo className="w-10 h-10 text-primary" />
            <span className="flex flex-col">
              <Text as="span" scale="headline-sm" className="text-on-surface uppercase tracking-wider">ANH COFFEE</Text>
              <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.2em]">Vietnamese Terroir</Text>
            </span>
          </Link>
        </div>

        <section className="bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl shadow-[0_12px_40px_-16px_rgba(89,64,29,0.18)] border border-outline-variant/30">
          <div className="mb-space-lg">
            <Text as="span" scale="label-sm" className="text-secondary uppercase tracking-[0.16em]">Administration</Text>
            <Text as="h1" scale="headline-md" className="text-on-surface mt-space-xs">Welcome back</Text>
            <Text as="p" scale="body-sm" className="text-on-surface-variant mt-space-xs">Sign in to manage your website.</Text>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <label htmlFor="admin-username" className="font-sans text-label-sm uppercase tracking-wider text-on-surface-variant">Username</label>
              <Input id="admin-username" name="username" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="admin" required />
            </div>
            <div className="flex flex-col gap-space-xs">
              <label htmlFor="admin-password" className="font-sans text-label-sm uppercase tracking-wider text-on-surface-variant">Password</label>
              <div className="relative">
                <Input id="admin-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" required className="pr-12" />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 px-space-md text-outline hover:text-on-surface transition-colors">
                  <Icon name="eye" className="w-5 h-5" />
                </button>
              </div>
            </div>

            <label className="flex items-center gap-space-xs cursor-pointer select-none">
              <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="w-4 h-4 rounded accent-primary" />
              <Text as="span" scale="body-sm" className="text-on-surface-variant">Keep me signed in for 12 hours</Text>
            </label>

            {error && <p role="alert" className="rounded bg-error-container/60 px-space-md py-space-sm text-body-sm text-on-error-container">{error}</p>}

            <Button type="submit" variant="secondary" size="lg" className="w-full justify-between mt-space-xs">
              <span>Sign in</span><span className="inline-flex items-center gap-space-xs"><Icon name="arrowForward" className="w-4 h-4" /><Icon name="lock" className="w-4 h-4" /></span>
            </Button>
          </form>

          <div className="mt-space-lg rounded bg-surface-container-low px-space-md py-space-sm">
            <Text as="p" scale="label-sm" className="text-on-surface-variant">Demo credentials: <strong className="text-primary">admin / admin</strong></Text>
          </div>
        </section>

        <Link href="/vi" className="mt-space-lg mx-auto inline-flex items-center justify-center gap-space-xs font-sans text-label-md uppercase tracking-wider text-secondary hover:text-primary transition-colors">
          <Icon name="arrowForward" className="w-4 h-4 rotate-180" />Back to website
        </Link>
      </div>
    </main>
  );
}
