import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingsClientList from "@/components/Booking/BookingsClientList";

export interface Booking {
  id?: string;
  _id?: string;
  title: string;
  destinationName?: string;
  departureDate: string;
  bookingId: string;
  price: number;
  imageUrl: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  country?: string;
}

export default async function MyBookings() {
  let bookings: Booking[] = [];
  let errorMessage = "";

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const user = session?.user;

    // ইউজার ইমেইল না থাকলে ফলব্যাক বা এম্টি রাখা যেতে পারে
    const userEmail = user?.email || "test@example.com";

    const res = await fetch(`http://localhost:8000/my-bookings/${userEmail}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }

    bookings = await res.json();
  } catch (error) {
    console.error("Error fetching bookings:", error);
    errorMessage = "Could not load your bookings at the moment. Please try again later.";
  }

  // যদি API থেকে ডেটা না আসে বা অফলাইন থাকে, তবে প্রিভিউ বা টেস্টের জন্য ডামি ডেটা দেখাবে
  const displayBookings: Booking[] = bookings.length > 0 ? bookings : [];

  return (
    <main className="min-h-screen bg-slate-50/60 pb-20">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-serif font-light text-slate-900 tracking-tight">
            My Bookings
          </h1>
          <p className="text-slate-500 text-sm font-normal">
            Manage and view your upcoming travel plans
          </p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Empty State */}
        {displayBookings.length === 0 && !errorMessage && (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200/80 shadow-sm space-y-3">
            <p className="text-slate-500 text-sm">You have no active bookings yet.</p>
            <Link href="/destinations">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white text-xs uppercase tracking-wider font-semibold">
                Explore Destinations
              </Button>
            </Link>
          </div>
        )}

        {/* Bookings List with Animation Component */}
        <BookingsClientList bookings={displayBookings} />

      </div>
    </main>
  );
}