"use client";
import NoteCard from "@/components/NoteCard";
import NoteProps from "@/types/note";
import { useQuery } from "react-query";
import axios from "axios";
import NoteCardSkeleton from "@/components/NoteCard/NoteCardSkeleton";
import ModeToggleButton from "@/components/ModeToggleButton";
import NewNoteDrawer from "@/components/NewNoteDrawer";
import Container from "@/components/Container";

export default function Home() {
  const { data: notes, isLoading } = useQuery<[NoteProps] | undefined>(
    "userNotes",
    async () => {
      const { data } = await axios.get("http://localhost:4000/notes");
      return data;
    }
  );
  return (
    <>
      <header>
        <Container className="border-b border-zinc-300 dark:border-zinc-600 flex justify-between w-full">
          <h1 className="text-2xl font-bold">Take a note</h1>

          <ModeToggleButton />
        </Container>
      </header>

      <Container>
        <main>
          <div className="flex flex-wrap gap-2 items-start">
            {notes
              ? notes.map((elem, index) => {
                  console.log(elem);
                  return <NoteCard key={elem.title + index} {...elem} />;
                })
              : Array.from({ length: 8 }).map((_, index) => (
                  <NoteCardSkeleton key={`skeleton-${index}`} />
                ))}
          </div>
          <div className="fixed lg:right-12 lg:bottom-12">
            <NewNoteDrawer />
          </div>
        </main>
      </Container>
    </>
  );
}
