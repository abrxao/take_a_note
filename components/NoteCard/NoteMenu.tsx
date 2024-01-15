"use client";
import { toast } from "sonner";
import { Edit2, X } from "lucide-react";
import useUserDataState from "@/stores/userDataStore";
import NoteProps from "@/types/note";
import { DrawingPinFilledIcon, DrawingPinIcon } from "@radix-ui/react-icons";
import useNoteDrawerState from "@/stores/noteModalStore";

interface NoteMenuProps {
  note: NoteProps;
}

export default function NoteMenu({ note }: NoteMenuProps) {
  const { removeNote, undoRemove, togglePinned } = useUserDataState();
  const { setEditNote, setIsDrawerNoteOpen } = useNoteDrawerState();
  return (
    <div className="flex gap-1">
      <button
        className="p-1 active:scale-8 dark:bg-zinc-700 hover:bg-zinc-200  dark:hover:bg-slate-400 rounded-md hover:text-red-400"
        aria-label="Delete note"
        type="button"
        onClick={() => {
          removeNote(note);
          toast("Note has been deleted", {
            description: `Click on 'undo' to get back "${note.title}" note`,
            action: {
              label: "undo",
              onClick: () => note.id && undoRemove(note.id),
            },
          });
        }}
      >
        <X size={14} />
      </button>
      <button
        data-value={note.favorite ? "checked" : ""}
        className="p-1 active:scale-8 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-slate-400 dark:data-[value=checked]:bg-emerald-600 data-[value=checked]:bg-emerald-400 text-sm  rounded-md hover:text-slate-500"
        aria-label="Toggle favorite"
        type="button"
        onClick={() => togglePinned(note)}
      >
        {note?.favorite ? <DrawingPinFilledIcon /> : <DrawingPinIcon />}
      </button>
      <button
        className="p-1 active:scale-8 dark:bg-zinc-700 rounded-md dark:hover:text-blue-300 hover:text-blue-600"
        aria-label="Edit note"
        type="button"
        onClick={() => {
          setIsDrawerNoteOpen(true);
          setEditNote(note);
        }}
      >
        <Edit2 size={14} />
      </button>
    </div>
  );
}
