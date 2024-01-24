import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import NewNoteDrawer from "./";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("NewNoteDrawer test", () => {
  test("NewNoteDrawer render mobile", () => {
    render(<NewNoteDrawer />);

    window.dispatchEvent(new Event("resize"));
    const tag = screen.getByTestId("newnotedrawer-button-mobile");
    expect(tag).toBeInTheDocument();
  });

  test("NewNoteDrawer render desktop", async () => {
    window.innerWidth = 1280;
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    await act(async () => {
      window.dispatchEvent(new Event("resize"));
    });
    render(<NewNoteDrawer />);

    const button = screen.getByTestId("newnotedrawer-button-desktop");
    expect(button).toBeInTheDocument();
  });
});
