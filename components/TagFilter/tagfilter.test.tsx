import React from "react";
import "@testing-library/jest-dom";

import { act, fireEvent, render, screen } from "@testing-library/react";
import TagFilter from ".";
test("Fluxo teste", async () => {
  const { container } = render(<TagFilter />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});
