
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Destination {
  id?: string;
  _id?: string;
  title: string;
  country: string;
  price: number;
  duration: string;
  imageUrl: string;
  description: string;
}

interface EditDestinationDialogProps {
  destination: Destination;
  onUpdate?: (updatedData: Destination) => void;
}

export function EditDestinationDialog({
  destination,
  onUpdate,
}: EditDestinationDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: destination.title || "",
    country: destination.country || "",
    price: destination.price ?? 0,
    duration: destination.duration || "",
    imageUrl: destination.imageUrl || "",
    description: destination.description || "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const destinationId = destination._id || destination.id;

    if (!destinationId) {
      console.error("Destination ID is missing.");
      return;
    }

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || `${process.env.BACKEND_URL}`;

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${apiUrl}/destination/${destinationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        console.error(
          "Failed to update destination:",
          await res.text()
        );
        return;
      }

      const updatedDestination: Destination = {
        ...destination,
        ...formData,
      };

      onUpdate?.(updatedDestination);

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating destination:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="h-9 gap-1.5 rounded-md border-slate-300 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-100"
      >
        <Edit3 className="h-3.5 w-3.5 text-sky-500" />
        Edit
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-white sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl font-medium text-slate-900">
              Edit Travel Package
            </DialogTitle>

            <DialogDescription className="text-xs text-slate-500">
              Update the details of this travel package below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="destination-title"
                className="text-xs font-semibold uppercase text-slate-700"
              >
                Destination Name
              </Label>

              <Input
                id="destination-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="h-10 bg-slate-50 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="destination-country"
                  className="text-xs font-semibold uppercase text-slate-700"
                >
                  Country
                </Label>

                <Input
                  id="destination-country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="h-10 bg-slate-50 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="destination-price"
                  className="text-xs font-semibold uppercase text-slate-700"
                >
                  Price (USD)
                </Label>

                <Input
                  id="destination-price"
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="h-10 bg-slate-50 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="destination-duration"
                  className="text-xs font-semibold uppercase text-slate-700"
                >
                  Duration
                </Label>

                <Input
                  id="destination-duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="h-10 bg-slate-50 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="destination-image"
                  className="text-xs font-semibold uppercase text-slate-700"
                >
                  Image URL
                </Label>

                <Input
                  id="destination-image"
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="h-10 bg-slate-50 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="destination-description"
                className="text-xs font-semibold uppercase text-slate-700"
              >
                Description
              </Label>

              <Textarea
                id="destination-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="bg-slate-50 text-sm"
              />
            </div>

            <DialogFooter className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
                className="h-10 border-slate-300 text-xs text-slate-600"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 bg-sky-500 text-xs font-semibold uppercase text-white hover:bg-sky-600"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
