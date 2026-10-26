"use client";

import React from "react";
import { ShieldCheck, Map, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: <ShieldCheck className="h-8 w-8 text-sky-400 stroke-[1.5]" />,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    id: 2,
    icon: <Map className="h-8 w-8 text-sky-400 stroke-[1.5]" />,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    id: 3,
    icon: <Headphones className="h-8 w-8 text-sky-400 stroke-[1.5]" />,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="w-full bg-cyan-50/40 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Why Choose Wanderlust
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="border-none shadow-sm bg-white rounded-none p-4 transition-all hover:shadow-md"
            >
              <CardContent className="p-6 space-y-4">
                <div className="inline-block">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}