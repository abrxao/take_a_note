import { act, fireEvent, render, screen } from "@testing-library/react";

import Container from ".";

describe("Note card tests", () => {
  test("render skeleton", async () => {
    render(<Container>Container</Container>);
    const noteCardSkeleton = screen.getByText("Container");

    expect(noteCardSkeleton).toMatchSnapshot();
  });
});
