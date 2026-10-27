
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface DeleteDestinationDialogProps {
  destinationId: string;
}

export default function DeleteDestinationDialog({
  destinationId,
}: DeleteDestinationDialogProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const res = await fetch(
        `${apiUrl}/destination/${destinationId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete destination");
      }

      setOpen(false);

      router.push("/destinations");
      router.refresh();
    } catch (error) {
      console.error("Error deleting destination:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Delete Trigger */}
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="h-9 gap-1.5 rounded-md border-rose-200 px-4 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </Button>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!loading) {
            setOpen(nextOpen);
          }
        }}
      >
        <DialogContent
          className="bg-white sm:max-w-md" >
          <DialogHeader>
            <DialogTitle className="font-serif text-lg font-medium text-slate-900">
              Are you sure you want to delete?
            </DialogTitle>

            <DialogDescription className="pt-1 text-xs text-slate-500">
              This action cannot be undone. This will permanently
              delete this travel package from the database.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => setOpen(false)}
              className="h-10 border-slate-300 text-xs text-slate-600"
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={loading}
              onClick={handleDelete}
              className="flex h-10 items-center gap-2 bg-rose-600 text-xs font-semibold uppercase text-white hover:bg-rose-700"
            >
              {loading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {loading ? "Deleting..." : "Confirm Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
