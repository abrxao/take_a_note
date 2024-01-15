"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Badge } from "../ui/badge";
import { twMerge } from "tailwind-merge";

interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  clickAction?: () => void;
}

export default function Tag({
  children,
  className,
  disabled,
  clickAction,
  ...props
}: TagProps): ReactNode {
  return (
    <button
      {...props}
      disabled={disabled || clickAction == undefined}
      className={twMerge("hover:opacity-85", className)}
      onClick={() => clickAction && clickAction()}
    >
      <Badge className="flex gap-1 items-center pointer-events-none">
        {children}
      </Badge>
    </button>
  );
}
