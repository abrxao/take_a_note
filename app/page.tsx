"use client";
import NoteCard from "@/components/NoteCard";
import NoteProps from "@/types/note";
import { useQuery } from "react-query";
import axios from "axios";
import NoteCardSkeleton from "@/components/NoteCard/NoteCardSkeleton";

export default function Home() {
  const { data: notes, isLoading } = useQuery<[NoteProps] | undefined>(
    "userNotes",
    async () => {
      const { data } = await axios.get("http://localhost:4000/notes");
      return data;
    }
  );
  return (
    <main className="min-h-screen p-24">
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
    </main>
  );
}
