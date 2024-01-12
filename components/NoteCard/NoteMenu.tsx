"use client";
import { toast } from "sonner";
import { PinIcon, X } from "lucide-react";
import useUserDataState from "@/stores/userDataStore";
import NoteProps from "@/types/note";
import { DrawingPinFilledIcon, DrawingPinIcon } from "@radix-ui/react-icons";

interface NoteMenuProps {
  note: NoteProps;
}

export default function NoteMenu({ note }: NoteMenuProps) {
  const { removeNote, undoRemove, togglePinned } = useUserDataState();
  return (
    <div className="flex gap-1">
      <button
        className="p-1 active:scale-8 dark:bg-zinc-700 rounded-md hover:text-red-400"
        aria-label="Delete note"
        type="button"
        onClick={() => {
          if (note) {
            removeNote(note);
            toast("Note has been deleted", {
              description: `Click on 'undo' to get back "${note.title}" note`,
              action: {
                label: "undo",
                onClick: () => note.id && undoRemove(note.id),
              },
            });
          } else {
            console.error("Note without id");
          }
        }}
      >
        <X size={14} />
      </button>
      <button
        data-value={note.favorite ? "checked" : ""}
        className="p-1 active:scale-8 dark:bg-zinc-700 dark:data-[value=checked]:bg-emerald-600 text-sm  rounded-md hover:text-slate-400"
        aria-label="Toggle favorite"
        type="button"
        onClick={() => {
          if (note) {
            togglePinned(note);
          }
        }}
      >
        {note?.favorite ? <DrawingPinFilledIcon /> : <DrawingPinIcon />}
      </button>
    </div>
  );
}
