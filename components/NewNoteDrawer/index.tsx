"use client";

import NewNoteDrawer_ from "./component";
import { useIsClient } from "@/hooks/useIsClient";

export default function NewNoteDrawer() {
  const isClient = useIsClient();

  if (isClient === false) {
    return null;
  }
  return <NewNoteDrawer_ />;
}
