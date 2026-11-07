"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Trash2, Eye, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Booking } from "@/app/my-bookings/page";
import { toast } from "react-toastify";

interface BookingsClientListProps {
  bookings: Booking[];
}

export default function BookingsClientList({ bookings: initialBookings }: BookingsClientListProps) {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCancel = async (bookingMongoId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      setDeletingId(bookingMongoId);
      
    
      const res = await fetch(`${process.env.BACKEND_URL}/my-bookings/${bookingMongoId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }
      setBookings((prev) => prev.filter((b) => b._id !== bookingMongoId));
      toast.success("Booking cancelled successfully!");

      router.refresh();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
        <p className="text-slate-500 text-sm">You have no active bookings remaining.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {bookings.map((booking, index) => {
        const bookingId = booking._id || booking.id || "";
        const targetDestinationId = booking.destinationId || booking._id;
        const isDeleting = deletingId === bookingId;

        return (
          <motion.div
            key={bookingId || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }} // 🔥 সিনট্যাক্স ঠিক করা হয়েছে
          >
            <Card className="border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-xl overflow-hidden group">
              <CardContent className="p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
                {/* Left Side: Image & Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full md:w-auto">
                  <div className="relative h-36 w-full sm:w-52 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                    <Image
                      src={booking.imageUrl || "https://images.unsplash.com/photo-1540206395-68808572332f"}
                      alt={booking.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div>
                      {booking.status === "Confirmed" ? (
                        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200 text-[11px] font-semibold gap-1 px-2.5 py-0.5 rounded-full shadow-none">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          Confirmed
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200 text-[11px] font-semibold gap-1 px-2.5 py-0.5 rounded-full shadow-none">
                          <Clock className="h-3 w-3 text-amber-600" />
                          Pending
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {booking.title}
                    </h3>

                    <div className="space-y-1 text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>Departure: {booking.departureDate}</span>
                      </div>
                      <div className="text-slate-400 font-normal">
                        Country: <span className="text-slate-600 font-semibold">{booking.country}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Price & Action Buttons */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 gap-4">
                  <div className="text-left md:text-right">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      ${booking.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Cancel Button */}
                    <Button
                      variant="outline"
                      disabled={isDeleting}
                      onClick={() => handleCancel(bookingId)}
                      className="border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-md h-9 px-4 text-xs font-semibold tracking-wide uppercase transition-colors gap-1.5"
                    >
                      {isDeleting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      {isDeleting ? "Cancelling..." : "Cancel"}
                    </Button>

                    {/* View Button (যাতে ডেটিনেশনের সঠিক ডিটেইলস পেজে যায়) */}
                    <Link href={`/destinations/${targetDestinationId}`}>
                      <Button
                        className="bg-sky-500 hover:bg-sky-600 text-white rounded-md h-9 px-4 text-xs font-semibold tracking-wide uppercase transition-all shadow-sm gap-1.5"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Button>
                    </Link>
                  </div>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}