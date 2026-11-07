"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Globe,
  Tag,
  DollarSign,
  Clock,
  Calendar,
  Image as ImageIcon,
  FileText,
  XCircle,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

export default function AddDestinationPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    country: "",
    category: "",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fix applied here: accept string or handle null safely
  const handleSelectChange = (value: string | null) => {
    if (value) {
      setFormData((prev) => ({ ...prev, category: value }));
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setFormData({
      title: "",
      country: "",
      category: "",
      price: "",
      duration: "",
      departureDate: "",
      imageUrl: "",
      description: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.BACKEND_URL}/add-destination`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      // Simulate API response delay or success
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success(`Your destination added successfully.`);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      
      // Optionally reset form after success
      // handleReset(e as any);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add destination.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-8">
        {/* Page Title Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-slate-900 tracking-tight">
            Add New Travel Package
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-normal">
            Create a memorable travel experience for explorers around the world.
          </p>
        </motion.div>

        {/* Success Alert Banner */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-md text-sm shadow-sm"
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>Travel package successfully created and published!</span>
          </motion.div>
        )}

        {/* Main Form Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border border-slate-200/80 shadow-xl shadow-slate-200/40 bg-white rounded-none sm:rounded-xl overflow-hidden">
            <CardContent className="p-6 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Destination Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-xs font-semibold text-slate-700 tracking-wide uppercase flex items-center gap-1.5"
                  >
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    Destination Name
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    required
                    placeholder="Bali Paradise"
                    value={formData.title}
                    onChange={handleChange}
                    className="bg-slate-50/70 border-slate-200/90 focus-visible:ring-1 focus-visible:ring-sky-500 rounded-md h-11 text-slate-900 placeholder:text-slate-400 text-sm transition-all focus:bg-white"
                  />
                </div>

                {/* 2. Country & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Country */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="country"
                      className="text-xs font-semibold text-slate-700 tracking-wide uppercase flex items-center gap-1.5"
                    >
                      <Globe className="h-3.5 w-3.5 text-slate-400" />
                      Country
                    </Label>
                    <Input
                      id="country"
                      name="country"
                      type="text"
                      required
                      placeholder="Indonesia"
                      value={formData.country}
                      onChange={handleChange}
                      className="bg-slate-50/70 border-slate-200/90 focus-visible:ring-1 focus-visible:ring-sky-500 rounded-md h-11 text-slate-900 placeholder:text-slate-400 text-sm transition-all focus:bg-white"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-700 tracking-wide uppercase flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5 text-slate-400" />
                      Category
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger className="bg-slate-50/70 border-slate-200/90 focus:ring-1 focus:ring-sky-500 rounded-md h-11 text-slate-900 text-sm focus:bg-white">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beach">Beach & Resort</SelectItem>
                        <SelectItem value="Mountain">Mountain & Trekking</SelectItem>
                        <SelectItem value="Cultural">Cultural & Heritage</SelectItem>
                        <SelectItem value="Island">Tropical Island</SelectItem>
                        <SelectItem value="Luxury">Luxury Getaway</SelectItem>
                        <SelectItem value="Adventure">Adventure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 3. Price & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Price */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="price"
                      className="text-xs font-semibold text-slate-700 tracking-wide uppercase flex items-center gap-1.5"
                    >
                      <DollarSign className="h-3.5 w-3.5 text-slate-400" />
                      Price (USD)
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      required
                      placeholder="e.g., 1299"
                      value={formData.price}
                      onChange={handleChange}
                      className="bg-slate-50/70 border-slate-200/90 focus-visible:ring-1 focus-visible:ring-sky-500 rounded-md h-11 text-slate-900 placeholder:text-slate-400 text-sm transition-all focus:bg-white"
                    />
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="duration"
                      className="text-xs font-semibold text-slate-700 tracking-wide uppercase flex items-center gap-1.5"
                    >
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      Duration
                    </Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="text"
                      required
                      placeholder="e.g., 7 Days/6 Nights"
                      value={formData.duration}
                      onChange={handleChange}
                      className="bg-slate-50/70 border-slate-200/90 focus-visible:ring-1 focus-visible:ring-sky-500 rounded-md h-11 text-slate-900 placeholder:text-slate-400 text-sm transition-all focus:bg-white"
                    />
                  </div>
                </div>

                {/* 4. Departure Date */}
                <div className="space-y-2">
                  <Label
                    htmlFor="departureDate"
                    className="text-xs font-semibold text-slate-700 tracking-wide uppercase flex items-center gap-1.5"
                  >
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    Departure Date
                  </Label>
                  <Input
                    id="departureDate"
                    name="departureDate"
                    type="date"
                    required
                    value={formData.departureDate}
                    onChange={handleChange}
                    className="bg-slate-50/70 border-slate-200/90 focus-visible:ring-1 focus-visible:ring-sky-500 rounded-md h-11 text-slate-900 text-sm transition-all focus:bg-white"
                  />
                </div>

                {/* 5. Image URL */}
                <div className="space-y-2">
                  <Label
                    htmlFor="imageUrl"
                    className="text-xs font-semibold text-slate-700 tracking-wide uppercase flex items-center gap-1.5"
                  >
                    <ImageIcon className="h-3.5 w-3.5 text-slate-400" />
                    Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    required
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="bg-slate-50/70 border-slate-200/90 focus-visible:ring-1 focus-visible:ring-sky-500 rounded-md h-11 text-slate-900 placeholder:text-slate-400 text-sm transition-all focus:bg-white"
                  />
                </div>

                {/* 6. Description */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-xs font-semibold text-slate-700 tracking-wide uppercase flex items-center gap-1.5"
                  >
                    <FileText className="h-3.5 w-3.5 text-slate-400" />
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    placeholder="Describe the travel experience..."
                    value={formData.description}
                    onChange={handleChange}
                    className="bg-slate-50/70 border-slate-200/90 focus-visible:ring-1 focus-visible:ring-sky-500 rounded-md text-slate-900 placeholder:text-slate-400 text-sm transition-all focus:bg-white resize-y"
                  />
                </div>

                {/* Form Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-100">
                  {/* Cancel Button */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="w-full sm:w-auto border-rose-300 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-md h-11 px-6 text-xs font-semibold tracking-wider transition-all uppercase flex items-center justify-center gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    Cancel
                  </Button>

                  {/* Add Travel Package Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white rounded-md h-11 px-6 text-xs font-semibold tracking-wider transition-all uppercase flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <PlusCircle className="h-4 w-4" />
                        <span>Add Travel Package</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}