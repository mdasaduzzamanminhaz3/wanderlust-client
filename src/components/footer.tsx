"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Header */}
        <div className="space-y-3 mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight">
            Wanderlast
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">
          {/* Newsletter Column */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Newsletter
            </h3>
            <p className="text-xs text-slate-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form onSubmit={handleSubscribe} className="relative max-w-sm pt-2">
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900/90 border-slate-800 text-white placeholder:text-slate-500 rounded-none h-11 pr-12 text-xs focus-visible:ring-1 focus-visible:ring-slate-700"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-2 h-11 w-11 text-slate-400 hover:text-white hover:bg-transparent rounded-none"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs text-slate-400 font-light">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Support
            </h3>
            <ul className="space-y-2 text-xs text-slate-400 font-light">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Contact Us
            </h3>
            <ul className="space-y-2 text-xs text-slate-400 font-light">
              <li>786 901 1622</li>
              <li>
                <a
                  href="mailto:info@wandarland.com"
                  className="hover:text-white transition-colors"
                >
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Wanderlust. All rights reserved.</p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-5 text-slate-400">
            {/* X / Twitter Custom Icon */}
            <Link
              href="#"
              className="hover:text-white transition-colors"
              aria-label="X (Twitter)"
            >
              <svg
                className="h-4 w-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>

            {/* LinkedIn */}
            <Link
              href="#"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin  className="h-4 w-4" />
            </Link>

            {/* Instagram */}
            <Link
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}