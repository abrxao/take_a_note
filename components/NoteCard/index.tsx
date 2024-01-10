"use client";
import React, { ReactNode } from "react";
import { CardDescription } from "../ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Checkbox } from "@radix-ui/react-checkbox";
interface NoteCardProps {
  title: string;
  description: string;
}

export default function NoteCard(): ReactNode {
  return (
    <div className="bg-slate-200 px-4 py-2 rounded-lg">
      <h4 className="font-bold">Checkbox</h4>
      <Separator className="my-4 w-full h-1 bg-black" />
      <div className="flex items-center space-x-2">
        <Checkbox id="test" className="h-8 w-8" />
        <label htmlFor="test">Deploy your new project in one-click.</label>
        <CardDescription></CardDescription>
      </div>
    </div>
  );
}
