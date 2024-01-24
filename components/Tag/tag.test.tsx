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

  test("Tag test click", async () => {
    const fnMock = jest.fn();
    const tagText = "hello world";
    render(<Tag clickAction={fnMock}>{tagText}</Tag>);
    const tag = screen.getByText(tagText);
    await act(async () => {
      fireEvent.click(tag);
    });
    expect(fnMock).toHaveBeenCalled();
  });
});
