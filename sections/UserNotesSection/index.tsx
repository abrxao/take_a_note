"use client";
import NoteCard from "@/components/NoteCard";
import NoteCardSkeleton from "@/components/NoteCard/NoteCardSkeleton";
import useUserDataState from "@/stores/userDataStore";
import { useEffect } from "react";
import { For } from "million/react";

export default function UserNotesSection() {
  const { userNotes, fetchUserNotes, isNotesFetching } = useUserDataState();
  useEffect(() => {
    fetchUserNotes();
  }, []);
  return (
    <>
      <div className="flex flex-wrap gap-2 items-start">
        {isNotesFetching ? (
          Array.from({ length: 8 }).map((_, index) => (
            <NoteCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          <>
            {userNotes.map((elem, index) => {
              return <NoteCard key={elem.title + elem.createDate} {...elem} />;
            })}
            {!userNotes.length && (
              <div className="w-full flex justify-center text-4xl">
                no notes yet
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
