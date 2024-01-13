import { create } from "zustand";

type FilterNotes = {
  isDrawerNoteOpen: boolean;
  setIsDrawerNoteOpen: (update: boolean) => void;
};

const useFilterNotesState = create<FilterNotes>((set) => ({
  isDrawerNoteOpen: false,
  setIsDrawerNoteOpen: (update: boolean) => {
    set((state) => ({ isDrawerNoteOpen: update }));
  },
}));

export default useFilterNotesState;
