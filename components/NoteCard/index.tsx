"use client";
import React, { ReactNode, useRef } from "react";
import { Separator } from "../ui/separator";
import NoteMenu from "./NoteMenu";
import { CardDescription } from "../ui/card";
import NoteProps from "@/types/note";
import TagsArea from "../FormNote/TagsArea";
import moment from "moment";
export default function NoteCard({
  title,
  id,
  createDate,
  lastEditDate,
  favorite,
  description,
  tags,
}: NoteProps): ReactNode {
  const note: NoteProps = {
    title,
    id,
    createDate,
    lastEditDate,
    description,
    favorite,
    tags,
  };

  return (
    <div
      data-isopen={""}
      className="dark:bg-zinc-800 max-w-xs animate-note-card-show duration-400 dark:border-zinc-700 dark:hover:bg-zinc-900 border border-zinc-300 px-4 py-2 rounded-lg grid"
    >
      <h4 className="font-bold">{title}</h4>
      <Separator className="my-2" />
      <div className="flex items-center space-x-2 overflow-hidden">
        <p className="text-sm font-medium leading-none text-clip">
          {description}
        </p>
      </div>
      {tags && <TagsArea tags={tags} className="mt-2" />}
      <CardDescription className="text-xs mt-3 dark:hover:text-zinc-500 hover:text-zinc-900">
        {lastEditDate
          ? `Edited ${moment(lastEditDate).calendar().toLocaleLowerCase()}`
          : `Created ${moment(createDate).calendar().toLocaleLowerCase()}`}
      </CardDescription>
      <div className="flex justify-end w-full">
        <NoteMenu note={note} />
      </div>
    </div>
  );
}
