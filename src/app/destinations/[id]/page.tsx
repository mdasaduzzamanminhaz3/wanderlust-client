import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Calendar, 
  Star, 
  ArrowLeft, 
  Check
} from "lucide-react";

import { EditDestinationDialog } from "@/components/Destination/editDestinationDialog";
import DeleteDestinationDialog from "@/components/Destination/deleteDestinationDialog";
import BookingCard from "@/components/Booking/bookingCard";

interface DestinationDetail {
  id?: string;
  _id?: string;
  title: string;
  country: string;
  category?: string;
  price: number;
  duration: string;
  departureDate?: string;
  imageUrl: string;
  description: string;
  rating?: number;
  reviewsCount?: number;
  highlights?: string[];
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DestinationsDetailsPage({ params }: PageProps) {
  const { id } = await params;

  let destination: DestinationDetail | null = null;
  let errorMessage = "";

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || `${process.env.BACKEND_URL}`;

  try {
    const res = await fetch(`${apiUrl}/destination/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch destination details");
    }

    destination = await res.json();
  } catch (error) {
    console.error("Error fetching destination details:", error);
    errorMessage = "Could not load destination details. Please try again later.";
  }

  // Fallback sample data if API is offline
  const data: DestinationDetail = destination || {
    id: id,
    title: "Bali Paradise",
    country: "Indonesia",
    price: 1299,
    duration: "7 Days / 6 Nights",
    imageUrl: "https://images.unsplash.com/photo-1540206395-68808572332f?q=80&w=1200&auto=format&fit=crop",
    description: "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.",
    rating: 4.9,
    reviewsCount: 234,
    highlights: [
      "Luxury beachfront accommodation",
      "Traditional Balinese spa treatment",
      "Sunrise trek to Mount Batur",
      "Visit Uluwatu Temple at sunset",
      "Private beach dinner experience",
    ],
  };

  const dData = data;

  // ডিলিট বা এডিট কম্পোনেন্টের জন্য আইডি নিশ্চিত করা (id বা _id যেকোনো একটি থাকতে পারে)
  const destinationId = data.id || data._id || id;

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        
        {/* Top Navigation & Action Buttons (Edit & Delete) */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/destinations"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Destinations
          </Link>

          {/* Edit & Delete Action Group */}
          <div className="flex items-center gap-3">
            
            {/* Reusable Edit Dialog Component */}
            <EditDestinationDialog destination={data} />

            {/* DELETE MODAL */}
            <DeleteDestinationDialog destinationId={destinationId} />

          </div>
        </div>

        {/* Error State */}
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-md">
            {errorMessage}
          </div>
        )}

{/* Hero Banner Image */}
<div className="relative h-80 sm:122.5 w-full rounded-xl overflow-hidden shadow-md bg-slate-100">
  <Image
    src={data.imageUrl}
    alt={data.title}
    fill
    priority
    sizes="(max-width: 768px) 100vw, 1200px"
    className="object-cover object-center"
  />
</div>
        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Details Column */}
          <div className="lg:col-span-2 space-y-8 bg-white p-6 sm:p-10 rounded-xl border border-slate-100 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center text-xs text-slate-500 gap-1 font-medium uppercase tracking-wider">
                <MapPin className="h-3.5 w-3.5 text-sky-500" />
                <span>{data.country}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-medium text-slate-900 tracking-tight">
                {data.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md">
                  <Star className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600" />
                  <span className="font-bold">{data.rating || 4.9}</span>
                  <span className="text-slate-400">({data.reviewsCount || 234} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-md">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  <span>{data.duration}</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Overview</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                {data.description}
              </p>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.highlights?.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <div className="h-5 w-5 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 stroke-3" />
                    </div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Booking Card Column */}
              <BookingCard dData={dData}/>

        </div>
      </div>
    </main>
  );
}