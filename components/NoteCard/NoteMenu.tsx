"use client";
import { toast } from "sonner";
import { Edit2, X } from "lucide-react";
import useUserDataState from "@/stores/userDataStore";
import NoteProps from "@/types/note";
import { DrawingPinFilledIcon, DrawingPinIcon } from "@radix-ui/react-icons";
import useNoteDrawerState from "@/stores/noteModalStore";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface NoteMenuProps {
  note: NoteProps;
}

function NoteMenuButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={twMerge(
        "p-1 active:scale-8 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-slate-400 rounded-md",
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export default function NoteMenu({ note }: NoteMenuProps) {
  const { removeNote, undoRemove, togglePinned } = useUserDataState();
  const { setEditNote, setIsDrawerNoteOpen } = useNoteDrawerState();
  return (
    <div className="flex gap-1">
      <NoteMenuButton
        className="hover:text-red-400"
        aria-label="Delete note"
        data-testid="note-menu-button-delete"
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
      </NoteMenuButton>
      <NoteMenuButton
        data-value={note.favorite ? "checked" : ""}
        className=" dark:data-[value=checked]:bg-emerald-600 data-[value=checked]:bg-emerald-400"
        aria-label="Toggle favorite"
        data-testid="note-menu-button-favorite"
        onClick={() => {
          togglePinned(note);
        }}
      >
        {note?.favorite ? (
          <DrawingPinFilledIcon data-testid="favorite-icon" />
        ) : (
          <DrawingPinIcon data-testid="to-favorite-icon" />
        )}
      </NoteMenuButton>
      <NoteMenuButton
        data-testid="note-menu-button-edit"
        className=" hover:text-blue-600"
        aria-label="Edit note"
        type="button"
        onClick={() => {
          setIsDrawerNoteOpen(true);
          setEditNote(note);
        }}
      >
        <Edit2 size={14} />
      </NoteMenuButton>
    </div>
  );
}
