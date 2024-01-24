"use client";
import React, { ReactNode, useRef } from "react";
import { Separator } from "../ui/separator";
import NoteMenu from "./NoteMenu";
import { CardDescription } from "../ui/card";
import NoteProps from "@/types/note";
import Tag from "../Tag";
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
  const titleRef = useRef(null);

  return (
    <article
      ref={titleRef}
      tabIndex={0}
      data-isopen={""}
      className="dark:bg-zinc-800 animate-note-card-show max-w-xs duration-400 dark:border-zinc-700 dark:hover:bg-zinc-900 border border-zinc-300 px-4 py-2 rounded-lg overflow-hidden"
    >
      <p className="font-bold" aria-label={title}>
        {title}
      </p>
      <Separator className="my-2" />
      <p
        className="text-sm font-medium leading-none text-clip"
        aria-label={description}
      >
        {description}
      </p>
      {tags && (
        <ul className={"flex flex-wrap items-start space-x-2 mt-2"}>
          {tags.map((elem) => {
            return (
              <li key={elem}>
                <Tag type="button" value={elem} aria-label={elem}>
                  {elem}
                </Tag>
              </li>
            );
          })}
        </ul>
      )}
      <CardDescription className="text-xs mt-3 dark:hover:text-zinc-500 hover:text-zinc-900">
        {lastEditDate
          ? `Edited ${moment(lastEditDate).calendar().toLocaleLowerCase()}`
          : `Created ${moment(createDate).calendar().toLocaleLowerCase()}`}
      </CardDescription>
      <div className="flex justify-end w-full mt-2">
        <NoteMenu note={note} />
      </div>
    </article>
  );
}
