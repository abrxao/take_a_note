"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function NoteCardSkeleton() {
  return (
    <div className="dark:bg-zinc-800 w-72 max-w-sm dark:border-zinc-700 dark:hover:bg-zinc-900 border border-zinc-300 px-4 py-2 rounded-lg">
      <Skeleton className="w-32 h-5" />
      <Separator className="my-2" />
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
      </div>
      <div className="flex justify-between items-center mt-4">
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
      </div>
    </div>
  );
}
