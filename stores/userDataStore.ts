import NoteProps from "@/types/note";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

type UserData = {
  userTags: string[];
  isNotesFetching: boolean;
  setUserTags: (update: string[]) => void;
  filteredTags: string[];
  clearFilter: () => void;
  setFilteredTags: (update: string) => void;
  userNotes: NoteProps[];
  fetchUserNotes: () => void;
  removeNote: (note: NoteProps) => void;
  undoRemove: (noteId: string) => void;
  noteToEdit: NoteProps | undefined;
  lastRemovedNotes: NoteProps[] | undefined;
  addNoteOnStore: (update: NoteProps) => void;
  editNoteOnStore: (update: NoteProps) => void;
  togglePinned: (note: NoteProps) => void;
};

const useUserDataState = create<UserData>((set, get) => ({
  userTags: [],
  filteredTags: [],
  setFilteredTags: (update: string) => {
    var { filteredTags } = get();
    if (filteredTags.includes(update)) {
      set((state) => ({
        filteredTags: state.filteredTags.filter((tag) => tag != update),
      }));
    } else {
      filteredTags.push(update);
      set((state) => ({
        filteredTags: filteredTags,
      }));
    }
  },
  setUserTags: (update: string[]) => {
    set(() => ({ userTags: update }));
  },
  clearFilter: () => set((state) => ({ filteredTags: [] })),
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
  editNoteOnStore: async (update: NoteProps) => {
    await axios.put(`http://localhost:4000/notes/${update.id}`, update);
    var { userTags, userNotes } = get();
    userNotes.forEach((elem, index) => {
      if (elem.id == update.id) {
        if (update.tags?.length) {
          const newTags = update.tags.filter((tag) => !userTags.includes(tag));
          userNotes[index] = update;
          set(() => ({
            userNotes: [...userNotes],
            userTags: [...userTags, ...newTags],
          }));
        }
        set(() => ({ userNotes: userNotes }));
      }
    });
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
        console.log(notes[index]);
        await axios.put(`http://localhost:4000/notes/${note.id}`, {
          ...note,
          favorite: notes[index].favorite,
        });
        set((state) => ({ userNotes: notes }));
      }
    });
  },
}));

export default useUserDataState;
