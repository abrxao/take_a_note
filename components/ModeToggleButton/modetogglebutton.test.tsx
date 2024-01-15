import React from "react";
import "@testing-library/jest-dom";

import { act, fireEvent, render, screen } from "@testing-library/react";
import ModeToggleButton from ".";
test("Toggle theme test", async () => {
  render(
    <>
      <ModeToggleButton />
    </>
  );
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});
