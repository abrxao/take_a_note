import React from "react";
import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import TagFilter from ".";
import useUserDataState from "@/stores/userDataStore";

describe("tag filter tests", () => {
  test("Fluxo teste", async () => {
    render(<TagFilter />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
