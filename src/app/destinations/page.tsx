import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Destination, DestinationCard } from "@/components/Destination/destinationCard";

export default async function AllDestinationsPage() {
  let destinations: Destination[] = [];
  let errorMessage = "";

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/destinations`, {
      cache: "no-store", // Ensures fresh data fetches
    });

    if (!res.ok) {
      throw new Error("Failed to fetch destinations from server");
    }

    destinations = await res.json();
  } catch (error) {
    console.error("Error loading destinations:", error);
    errorMessage = "Could not load destinations at this moment. Please try again later.";
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 space-y-10">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-slate-900 tracking-tight">
          Explore All Destinations
        </h1>
        <p className="text-slate-500 text-sm sm:text-base font-normal">
          Find your perfect travel experience from our curated collection
        </p>
      </div>

      {/* Filters & Sorting Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-100">
        <div className="w-full">
          <Select>
            <SelectTrigger className="bg-white border-slate-200 rounded-none h-11 text-xs uppercase tracking-wider text-slate-600 font-semibold">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="beach">Beach & Resort</SelectItem>
              <SelectItem value="mountain">Mountain</SelectItem>
              <SelectItem value="island">Island</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Select>
            <SelectTrigger className="bg-white border-slate-200 rounded-none h-11 text-xs uppercase tracking-wider text-slate-600 font-semibold">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="low">Under $1,500</SelectItem>
              <SelectItem value="mid">$1,500 - $3,000</SelectItem>
              <SelectItem value="high">Above $3,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Select>
            <SelectTrigger className="bg-white border-slate-200 rounded-none h-11 text-xs uppercase tracking-wider text-slate-600 font-semibold">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest Added</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
        Showing {destinations.length} destinations
      </p>

      {/* Error or Empty States */}
      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-md">
          {errorMessage}
        </div>
      )}

      {!errorMessage && destinations.length === 0 && (
        <div className="py-20 text-center text-slate-500 text-sm">
          No travel packages found. Please add a new destination package.
        </div>
      )}

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id || destination._id}
            destination={destination}
          />
        ))}
      </div>
    </main>
  );
}