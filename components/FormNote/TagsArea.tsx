"use client";
import { MouseEventHandler, ReactNode } from "react";
import { Badge } from "../ui/badge";
import { twMerge } from "tailwind-merge";

interface TagsAreaProps {
  tags: string[];
  className?: string;
  clickAction?: MouseEventHandler<HTMLButtonElement>;
  Icon?: any;
}

export default function TagsArea({
  tags,
  className,
  clickAction,
  Icon,
}: TagsAreaProps): ReactNode {
  return (
    <ul className={twMerge("flex flex-wrap gap-2", className)}>
      {tags.map((elem, index) => {
        return (
          <li key={elem + index}>
            <button
              type="button"
              value={elem}
              onClick={clickAction}
              disabled={clickAction == undefined}
              className="hover:opacity-85"
            >
              <Badge className="flex gap-1 items-center pointer-events-none">
                {elem}
                {Icon}
              </Badge>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
