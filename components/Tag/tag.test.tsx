import React from "react";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Tag from ".";

describe("Tag tests", () => {
  test("Tag render", () => {
    render(<Tag />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("toggles theme on button click", async () => {
    const tagText = "hello world";
    render(<Tag>{tagText}</Tag>);
    const tag = screen.getByText(tagText);

    expect(tag).toBeInTheDocument();
  });
});
