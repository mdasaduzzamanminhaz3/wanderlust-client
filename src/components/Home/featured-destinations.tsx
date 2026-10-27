"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { DestinationCard, Destination } from "../Destination/destinationCard";

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Fetch data from your backend API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/destinations");
        
        if (!res.ok) {
          throw new Error("Failed to fetch featured destinations");
        }

        const data = await res.json();
        setDestinations(data);
      } catch (err) {
        console.error("Error fetching destinations:", err);
        setError("Could not load destinations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

// Handle Carousel API state
  useEffect(() => {
    if (!api) return;

    // সরাসরি স্টেট সিঙ্ক করার বদলে রেন্ডার সাইকেলের বাইরে হ্যান্ডেল করা
    const updateState = () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCount(api.scrollSnapList().length);
    };

    updateState();

    api.on("select", updateState);
    api.on("reInit", updateState);

    return () => {
      api.off("select", updateState);
      api.off("reInit", updateState);
    };
  }, [api, destinations]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
      <Carousel setApi={setApi} className="w-full">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
              Featured Destinations
            </h2>
            <p className="text-slate-500 text-sm md:text-base mt-2">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link href="/destinations">
            <Button
              variant="outline"
              className="border-sky-300 text-sky-400 hover:text-sky-500 hover:bg-sky-50 rounded-none tracking-wider text-xs font-semibold px-5 py-5 uppercase self-start sm:self-auto transition-colors"
            >
              All Destinations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="h-8 w-8 text-sky-400 animate-spin" />
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Loading destinations...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-600 text-sm rounded-md text-center">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && destinations.length === 0 && (
          <div className="py-16 text-center text-slate-500 text-sm">
            No featured destinations available.
          </div>
        )}

        {/* Carousel Content */}
        {!loading && !error && destinations.length > 0 && (
          <>
            <CarouselContent className="-ml-6">
              {destinations.map((destination) => (
                <CarouselItem
                  key={destination.id || destination._id}
                  className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <DestinationCard destination={destination} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Bottom Navigation & Progress Track */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
              {/* Slide Indicator & Progress Line */}
              <div className="flex items-center gap-4 flex-1 max-w-2xl">
                <span className="text-sm font-semibold text-slate-700 min-w-12">
                  {current}/{count || destinations.length}
                </span>
                <div className="h-[1.5px] bg-slate-200 flex-1 relative overflow-hidden">
                  <div
                    className="h-full bg-slate-400 transition-all duration-300"
                    style={{
                      width: `${(current / (count || destinations.length)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Previous / Next Arrow Controls */}
              <div className="relative flex items-center gap-2 pl-4">
                <CarouselPrevious className="static translate-y-0 h-10 w-10 border-slate-300 text-slate-600 hover:bg-slate-100 rounded-full" />
                <CarouselNext className="static translate-y-0 h-10 w-10 border-slate-300 text-slate-600 hover:bg-slate-100 rounded-full" />
              </div>
            </div>
          </>
        )}
      </Carousel>
    </section>
  );
}