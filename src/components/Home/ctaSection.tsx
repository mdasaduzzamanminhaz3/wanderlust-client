"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative w-full h-[420px] md:h-[480px] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
          alt="Aerial view of tropical island with airplane"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-slate-950" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight font-light text-white">
          Ready To Start Your Journey?
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-light max-w-xl mx-auto">
          Join thousands of travelers who have discovered the world with us
        </p>

        <div className="pt-2">
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-slate-100 rounded-none px-8 py-6 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            Book Your Trip Today
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}