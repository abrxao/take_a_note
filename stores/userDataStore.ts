import { TOAST_DURATION } from "./../lib/consts";
import NoteProps from "@/types/note";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

type UserData = {
  userTags: string[];
  isNotesFetching: boolean;
  setUserTags: (update: string[]) => void;
  userNotes: NoteProps[];
  fetchUserNotes: () => void;
  removeNote: (note: NoteProps) => void;
  undoRemove: (noteId: string) => void;
  noteToEdit: NoteProps | undefined;
  lastRemovedNotes: NoteProps[] | undefined;
  addNoteOnStore: (update: NoteProps) => void;
  togglePinned: (note: NoteProps) => void;
};

const useUserDataState = create<UserData>((set, get) => ({
  userTags: [],
  setUserTags: (update: string[]) => {
    set(() => ({ userTags: update }));
  },
  noteToEdit: undefined,
  isNotesFetching: true,
  userNotes: [],
  fetchUserNotes: async () => {
    try {
      const response: AxiosResponse<NoteProps[]> = await axios.get(
        "http://localhost:4000/notes"
      );
      const { data: notes } = response;
      const allUserTags = new Set<string>();

      notes.forEach((note) => {
        if (note.tags) {
          note.tags.forEach((tag) => allUserTags.add(tag));
        }
      });
      set((state) => ({ userNotes: notes, userTags: Array.from(allUserTags) }));
    } catch (e) {
      console.error(e);
    } finally {
      set((state) => ({ isNotesFetching: false }));
    }
  },
  addNoteOnStore: async (update: NoteProps) => {
    const { data: newNote } = await axios.post(
      "http://localhost:4000/notes",
      update
    );
    const { userTags, userNotes } = get();
    if (update.tags?.length) {
      const newTags = update.tags.filter((tag) => !userTags.includes(tag));
      set(() => ({
        userNotes: [...userNotes, newNote],
        userTags: [...userTags, ...newTags],
      }));
    }
    set(() => ({ userNotes: [...userNotes, newNote] }));
  },
  removeNote: async (noteToRemove: NoteProps) => {
    const { lastRemovedNotes } = get();
    await axios.delete(`http://localhost:4000/notes/${noteToRemove.id}`);

    if (lastRemovedNotes != undefined) {
      set((state) => ({
        userNotes: state.userNotes.filter(
          (note) => note.id !== noteToRemove.id
        ),
        lastRemovedNotes: [...lastRemovedNotes, noteToRemove],
      }));
    } else {
      set((state) => ({
        userNotes: state.userNotes.filter(
          (note) => note.id !== noteToRemove.id
        ),
        lastRemovedNotes: [noteToRemove],
      }));
    }
  },
  lastRemovedNotes: undefined,
  undoRemove: async (noteId: string) => {
    const lastRemovedNote = get().lastRemovedNotes?.find(
      (note) => note.id == noteId
    );
    if (lastRemovedNote != undefined) {
      await axios.post("http://localhost:4000/notes", lastRemovedNote);

      set((state) => ({ userNotes: [...state.userNotes, lastRemovedNote] }));
    }
  },
  togglePinned: (note: NoteProps) => {
    const notes = get().userNotes;
    notes.forEach(async (userNote, index) => {
      if (userNote.id == note.id) {
        notes[index] = { ...note, favorite: !notes[index].favorite };
        await axios.put(`http://localhost:4000/notes/${note.id}`, {
          ...note,
          favorite: !notes[index].favorite,
        });
        set((state) => ({ userNotes: notes }));
      }
    });
  },
}));

export default useUserDataState;
