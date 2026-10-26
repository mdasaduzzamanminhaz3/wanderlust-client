"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Calendar, Star, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Destination {
  id?: string | number;
  _id?: string | number;
  title: string;
  country: string;
  duration: string;
  price: number;
  rating?: number;
  imageUrl: string;
}

interface DestinationCardProps {
  destination: Destination;
  onBookNow?: (id: string | number) => void;
}

export function DestinationCard({
  destination,
  onBookNow,
}: DestinationCardProps) {
  const { id, _id, title, country, duration, price, rating = 4.5, imageUrl } = destination;
  const cardId = id || _id || "";

  return (
    <Card className="border-none shadow-none bg-transparent group cursor-pointer w-full">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative h-64 sm:h-72 w-full rounded-none overflow-hidden mb-4 bg-slate-100">
          <Image
            src={imageUrl || "https://images.unsplash.com/photo-1540206395-68808572332f"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Rating Badge */}
          <Badge className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-800 rounded-none px-2.5 py-1 text-xs font-semibold backdrop-blur-sm border-none shadow-sm flex items-center gap-1">
            <span>{rating.toFixed(1)}</span>
            <Star className="h-3.5 w-3.5 fill-black text-black" />
          </Badge>
        </div>

        {/* Details Section */}
        <div className="space-y-2">
          <div className="flex items-center text-xs text-slate-500 gap-1 font-medium">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span>{country}</span>
          </div>

          <div className="flex items-baseline justify-between pt-0.5">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              {title}
            </h3>
            <div className="text-right">
              <span className="text-xl font-extrabold text-slate-900">
                ${price}
              </span>
              <span className="text-xs text-slate-400 font-normal">
                /Person
              </span>
            </div>
          </div>

          <div className="flex items-center text-xs text-slate-500 gap-1.5 pt-0.5">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>{duration}</span>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onBookNow?.(cardId)}
              className="inline-flex items-center text-xs font-bold text-sky-400 hover:text-sky-500 uppercase tracking-wider gap-0.5 transition-colors"
            >
              Book Now
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}