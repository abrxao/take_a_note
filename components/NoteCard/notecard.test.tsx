import { act, fireEvent, render, screen } from "@testing-library/react";
import NoteCard from ".";
import NoteProps from "@/types/note";
import NoteCardSkeleton from "./NoteCardSkeleton";

describe("Note card tests", () => {
  const note: NoteProps = {
    title: "Nova nota",
    id: "3637",
    createDate: new Date("2024-01-15T11:37:33.749Z"),
    favorite: true,
    tags: ["The Love"],
  };
  const editedNote: NoteProps = {
    ...note,
    lastEditDate: new Date("2024-01-19T16:28:32.993Z"),
  };

  test("Render Note with only create date", async () => {
    render(<NoteCard {...note} />);
    const title = screen.getByText(note.title);
    expect(title).toBeInTheDocument();
  });
  test("Render Note with tags, create and last edited date", async () => {
    render(<NoteCard {...editedNote} />);
    const title = screen.getByText(editedNote.title);
    expect(title).toBeInTheDocument();
  });
  test("Simulation click on favorite", async () => {
    render(<NoteCard {...editedNote} />);
    const favoriteButton = screen.getByTestId("note-menu-button-favorite");
    await act(async () => {
      fireEvent.click(favoriteButton);
    });
    const iconFavorite = await screen.findByTestId("favorite-icon");
    expect(iconFavorite).toBeInTheDocument();
  });
  test("render skeleton", async () => {
    render(<NoteCardSkeleton />);
    const noteCardSkeleton = screen.getByTestId("note-card-skeleton");

    expect(noteCardSkeleton).toMatchSnapshot();
  });
});
