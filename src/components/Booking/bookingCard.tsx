"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {  
  Calendar,
  Check, 
  ShieldCheck, 
  Headphones, 
  ArrowRight
} from "lucide-react";
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
interface DestinationDetail {
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
const BookingCard = ({dData}:{dData:DestinationDetail}) => {
    const {data: session} = authClient.useSession();
    const user = session?.user;
const handleBooking = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const departureDate = (form.elements.namedItem("departureDate") as HTMLInputElement)?.value;
    
    const data = {
        username: user?.name,
        email: user?.email,
        image: user?.image,
        title: dData.title,
        country: dData.country,
        price: dData.price,
        duration: dData.duration,
        imageUrl: dData.imageUrl,
        description: dData.description,
        destinationId: dData._id, 
        departureDate: departureDate,
        bookingDate: new Date(),
        status: "Confirmed" 
    };
    
    try {
        const res = await fetch('http://localhost:8000/booking', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const bookingResponse = await res.json();
        
        if(res.ok) {
            toast.success("Booking successfully!");
            console.log(bookingResponse);
        }
    } catch (error) {
        console.error("Booking error:", error);
        toast.error("Failed to book destination.");
    }
}
    return (
          <div className="lg:col-span-1">
            <Card className="border border-slate-200/80 shadow-lg rounded-xl bg-white sticky top-6">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Starting from</span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl font-extrabold text-slate-900">${dData.price}</span>
                    <span className="text-xs text-slate-400">/ person</span>
                  </div>
                </div>
                <form onSubmit={handleBooking}>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    Select Date
                  </label>
                  <Input 
                    type="date" 
                    name="departureDate"
                    defaultValue={dData.departureDate}
                    className="bg-slate-50 border-slate-200 text-slate-900 text-sm h-11 rounded-md"
                  />
                </div>

                <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-md h-12 text-xs font-semibold tracking-wider uppercase transition-all shadow-md shadow-sky-500/20 flex items-center justify-center gap-2">
                  <span>Book Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                </form>
                <hr className="border-slate-100" />

                <div className="space-y-3 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Free cancellation up to 7 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-sky-500 shrink-0" />
                    <span>Travel insurance included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Headphones className="h-4 w-4 text-sky-500 shrink-0" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
    );
};

export default BookingCard;