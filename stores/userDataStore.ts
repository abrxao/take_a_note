import NoteProps from "@/types/note";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

type UserData = {
  addNoteOnStore: (update: NoteProps) => void;
  clearFilter: () => void;
  editNoteOnStore: (update: NoteProps) => void;
  fetchUserNotes: () => void;
  filteredTags: string[];
  isNotesFetching: boolean;
  lastRemovedNotes: NoteProps[] | undefined;
  noteToEdit: NoteProps | undefined;
  removeNote: (note: NoteProps) => void;
  removeTagFromFilter: (update: string) => void;
  setFilteredTags: (update: string) => void;
  setUserTags: (update: string[]) => void;
  togglePinned: (note: NoteProps) => void;
  undoRemove: (noteId: string) => void;
  userNotes: NoteProps[];
  userTags: string[];
};

const useUserDataState = create<UserData>((set, get) => {
  return {
    userTags: [],
    isNotesFetching: true,
    filteredTags: [],
    noteToEdit: undefined,
    userNotes: [],
    lastRemovedNotes: undefined,

    // Functions
    setUserTags: (update: string[]) => {
      set(() => ({ userTags: update }));
    },
    removeTagFromFilter: (update: string) => {
      const { filteredTags } = get();
      const index = filteredTags.indexOf(update);
      filteredTags.splice(index, 1);
      set((state) => ({ filteredTags: filteredTags }));
    },
    setFilteredTags: (update: string) => {
      var { filteredTags } = get();
      if (filteredTags.includes(update)) {
        set((state) => ({
          filteredTags: state.filteredTags.filter((tag) => tag !== update),
        }));
      } else {
        filteredTags.push(update);
        set((state) => ({
          filteredTags: filteredTags,
        }));
      }
    },
    clearFilter: () => set((state) => ({ filteredTags: [] })),
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

        set((state) => ({
          userNotes: notes,
          userTags: Array.from(allUserTags),
        }));
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
        if (elem.id === update.id) {
          if (update.tags?.length) {
            const newTags = update.tags.filter(
              (tag) => !userTags.includes(tag)
            );
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
    undoRemove: async (noteId: string) => {
      const lastRemovedNote = get().lastRemovedNotes?.find(
        (note) => note.id === noteId
      );
      if (lastRemovedNote != undefined) {
        await axios.post("http://localhost:4000/notes", lastRemovedNote);
        set((state) => ({ userNotes: [...state.userNotes, lastRemovedNote] }));
      }
    },
    togglePinned: (note: NoteProps) => {
      const notes = get().userNotes;
      notes.forEach(async (userNote, index) => {
        if (userNote.id === note.id) {
          notes[index] = { ...note, favorite: !notes[index].favorite };
          await axios.put(`http://localhost:4000/notes/${note.id}`, {
            ...note,
            favorite: notes[index].favorite,
          });
          set((state) => ({ userNotes: notes }));
        }
      });
    },
  };
});

export default useUserDataState;
