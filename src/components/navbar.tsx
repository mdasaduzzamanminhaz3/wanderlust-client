"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, UserRound, X } from "lucide-react";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/add_destination", label: "Add Destinations" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/admin", label: "Admin" },
];

const authLinks = [
  { href: "/profile", label: "Profile" },
  { href: "/signin", label: "Login" },
  { href: "/signup", label: "Sign Up" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);
  const handleSignOut = () => {
    authClient.signOut();
  };
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 shadow-sm backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex h-16 md:h-20 items-center px-4 sm:px-6 lg:px-8"
      >
        {/* Left: primary nav (desktop); empty spacer on mobile keeps brand centered */}
        <div className="flex flex-1 items-center gap-6">
          {primaryLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "hidden text-sm font-medium text-foreground transition-colors hover:text-primary md:inline-block",
                  active && "text-primary underline underline-offset-4",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Center: brand (absolute-centered on desktop, flex-centered on mobile) */}
        <Link
          href="/"
          className="font-heading text-2xl font-semibold text-primary transition-colors md:absolute md:left-1/2 md:-translate-x-1/2 md:text-[1.7rem]"
        >
          Wanderlust
        </Link>

        {/* Right: account links (desktop) + hamburger (mobile) */}
        <div className="flex flex-1 items-center justify-end gap-5">
          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    aria-label="Open user menu"
                    className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Avatar>
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image ?? undefined}
                        alt={user?.name ?? "User"}
                      />
                      <AvatarFallback>
                        {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />

              <PopoverContent align="start">
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>

                  <PopoverDescription>{user?.email}</PopoverDescription>
                </PopoverHeader>

                <div className="flex flex-col gap-2 px-4 py-3">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
                  >
                    <UserRound className="size-4" aria-hidden="true" />
                    Profile
                  </Link>

                  <Button onClick={handleSignOut} variant="destructive">
                    Sign Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link
                href="/signIn"
                className="hidden text-sm font-medium text-foreground transition-colors hover:text-primary md:inline-block"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="hidden h-9 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/80 md:inline-flex"
              >
                Sign Up
              </Link>
            </>
          )}

          <button
            type="button"
            className="rounded-md p-2 text-foreground transition-colors hover:text-primary md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="flex flex-col gap-1 border-b border-border bg-background px-4 py-4 shadow-lg md:hidden"
        >
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted",
              )}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="my-2 border-border" />
          {authLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
