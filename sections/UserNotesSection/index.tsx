"use client";
import TagsArea from "@/components/FormNote/TagsArea";
import NewNoteDrawer from "@/components/NewNoteDrawer";
import NoteCard from "@/components/NoteCard";
import NoteCardSkeleton from "@/components/NoteCard/NoteCardSkeleton";
import { Button } from "@/components/ui/button";
import useUserDataState from "@/stores/userDataStore";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function UserNotesSection() {
  const {
    userNotes,
    fetchUserNotes,
    filteredTags,
    clearFilter,
    isNotesFetching,
  } = useUserDataState();
  const hasFavorite = userNotes.some((currentNote) => currentNote.favorite);
  const hasNormalNote = userNotes.some((currentNote) => !currentNote.favorite);
  useEffect(() => {
    fetchUserNotes();
  }, []);
  return (
    <div className="w-full mt-4 ">
      <NewNoteDrawer />
      <div className="flex mt-4 flex-col items-start">
        {isNotesFetching ? (
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <NoteCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : (
          <>
            {filteredTags.length ? (
              <div className="w-full">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 py-3">
                    <p>Selected tags:</p>
                    <TagsArea tags={filteredTags} />
                  </div>
                  <Button
                    variant={"destructive"}
                    onClick={clearFilter}
                    size={"xs"}
                  >
                    Clear tags <X className="pl-2" size={14} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 items-start">
                  {userNotes.map((elem) => {
                    if (elem.tags?.length) {
                      for (const tag in elem.tags) {
                        if (filteredTags.includes(elem.tags[tag])) {
                          return (
                            <NoteCard
                              key={elem.title + elem.createDate}
                              {...elem}
                            />
                          );
                        }
                      }
                    }
                  })}
                </div>
              </div>
            ) : (
              <>
                {hasFavorite && (
                  <div>
                    <p>favorites</p>
                    <div className="flex flex-wrap gap-2 items-start">
                      {userNotes.map((elem) => {
                        if (elem.favorite) {
                          return (
                            <NoteCard
                              key={elem.title + elem.createDate}
                              {...elem}
                            />
                          );
                        }
                      })}
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  {hasFavorite && hasNormalNote && <p>others notes</p>}
                  <div className="flex flex-wrap gap-2 items-start">
                    {userNotes.map((elem) => {
                      if (!elem.favorite) {
                        return (
                          <NoteCard
                            key={elem.title + elem.createDate}
                            {...elem}
                          />
                        );
                      }
                    })}
                  </div>
                  {!userNotes.length && (
                    <div className="w-full flex justify-center text-4xl">
                      no notes yet
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
