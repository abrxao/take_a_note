"use client";

import { useIsClient } from "@uidotdev/usehooks";
import NewNoteDrawer_ from "./component";

export default function NewNoteDrawer() {
  const isClient = useIsClient();

  if (isClient === false) {
    return null;
  }

  return (
    <>
      <NewNoteDrawer_ />;
    </>
  );
}
