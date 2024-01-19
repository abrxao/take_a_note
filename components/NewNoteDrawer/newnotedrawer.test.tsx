import React from "react";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import NewNoteDrawer from "./component";

describe("NewNoteDrawer", () => {
  test("NewNoteDrawer button", () => {
    render(<NewNoteDrawer />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
