import { create } from "zustand";

type NoteDrawer = {
  isDrawerNoteOpen: boolean;
  setIsDrawerNoteOpen: (update: boolean) => void;
};

const useNoteDrawerState = create<NoteDrawer>((set) => ({
  isDrawerNoteOpen: false,
  setIsDrawerNoteOpen: (update: boolean) => {
    set((state) => ({ isDrawerNoteOpen: update }));
  },
}));

export default useNoteDrawerState;
