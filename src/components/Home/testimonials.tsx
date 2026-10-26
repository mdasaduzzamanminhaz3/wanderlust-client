"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  location: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    quote:
      '"An unforgettable experience exploring Japan with Wanderlust. The itinerary was perfectly balanced between historic culture and modern luxury."',
    name: "Kenji Sato",
    location: "Tokyo, Japan",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel className="w-full">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
                What Travelers Say
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-2">
                Real experiences from our happy travelers
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="relative flex items-center gap-2 self-start sm:self-auto">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 border-slate-300 text-slate-600 hover:bg-slate-100 rounded-full" />
              <CarouselNext className="static translate-y-0 h-10 w-10 border-slate-300 text-slate-600 hover:bg-slate-100 rounded-full" />
            </div>
          </div>

          {/* Testimonial Cards Slider */}
          <CarouselContent className="-ml-6">
            {testimonials.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-6 basis-full lg:basis-1/2"
              >
                <Card className="border border-slate-100 shadow-sm bg-slate-50/50 rounded-none overflow-hidden h-full">
                  <CardContent className="p-0 h-full">
                    <div className="grid grid-cols-1 sm:grid-cols-5 h-full min-h-[260px]">
                      {/* Quote Details */}
                      <div className="sm:col-span-3 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                        <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed italic">
                          {item.quote}
                        </p>
                        <div>
                          <p className="text-sky-400 font-bold text-sm tracking-wide">
                            — {item.name}
                          </p>
                          <p className="text-slate-400 text-xs mt-0.5 font-normal">
                            {item.location}
                          </p>
                        </div>
                      </div>

                      {/* User Avatar Image */}
                      <div className="sm:col-span-2 relative h-64 sm:h-auto min-h-[200px]">
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}