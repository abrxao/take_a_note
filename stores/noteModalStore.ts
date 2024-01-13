import NoteProps from "@/types/note";
import { create } from "zustand";

type NoteDrawer = {
  isDrawerNoteOpen: boolean;
  setIsDrawerNoteOpen: (update: boolean) => void;
  editNote: NoteProps | null;
  setEditNote: (update: NoteProps) => void;
  clearEditNote: () => void;
};

const useNoteDrawerState = create<NoteDrawer>((set) => ({
  isDrawerNoteOpen: false,
  setIsDrawerNoteOpen: (update: boolean) => {
    set((state) => ({ isDrawerNoteOpen: update }));
  },
  editNote: null,
  setEditNote: (update: NoteProps) => {
    set((state) => ({ editNote: update }));
  },
  clearEditNote: () => {
    set((state) => ({ editNote: null }));
  },
}));

export default useNoteDrawerState;
