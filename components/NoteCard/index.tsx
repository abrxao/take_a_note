"use client";
import React, { ReactNode } from "react";
import { Separator } from "../ui/separator";
import NoteMenu from "./NoteMenu";
import { CardDescription } from "../ui/card";
import NoteProps from "@/types/note";
import momento from "@/lib/momentPt_br";
import { Badge } from "../ui/badge";

export default function NoteCard({
  title,
  id,
  createDate,
  lastEditDate,
  description,
  tags,
}: NoteProps): ReactNode {
  return (
    <div className="dark:bg-zinc-800 min-w-56 max-w-xs dark:border-zinc-700 dark:hover:bg-zinc-900 border border-zinc-300 px-4 py-2 rounded-lg grow">
      <h4 className="font-bold">{title}</h4>
      <Separator className="my-2" />
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium leading-none">{description}</p>
      </div>
      {tags && (
        <div className="mt-2">
          {tags.map((tag, index) => {
            return <Badge key={tag + index}>{tag}</Badge>;
          })}
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <CardDescription className="dark:hover:text-zinc-500 hover:text-zinc-900">
          {lastEditDate
            ? `Editado ${momento(lastEditDate).calendar()}`
            : `Criado ${momento(createDate).calendar()}`}
        </CardDescription>

        <NoteMenu />
      </div>
    </div>
  );
}
