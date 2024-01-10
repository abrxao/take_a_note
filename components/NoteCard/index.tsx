"use client";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import NoteMenu from "./NoteMenu";
import { CardDescription } from "../ui/card";
interface NoteCardProps {
  title: string;
  description: string;
}

export default function NoteCard(): ReactNode {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div className="dark:bg-slate-500 border border-slate-300 px-4 py-2 rounded-lg">
      <h4 className="font-bold">Checkbox</h4>
      <Separator className="my-1" />
      <div className="flex items-center space-x-2">
        <Checkbox
          id="test"
          checked={isChecked}
          onClick={(e) => setIsChecked(!isChecked)}
        />
        <label htmlFor="test">Deploy your new project in one-click.</label>
      </div>
      <div className="flex justify-between items-center">
        <CardDescription className="dark:hover:text-slate-300 hover:text-slate-700">
          Editado
        </CardDescription>
        <NoteMenu />
      </div>
    </div>
  );
}
