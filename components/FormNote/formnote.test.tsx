import { act, fireEvent, render, screen } from "@testing-library/react";
import FormNote from ".";

describe("send note forms tests", () => {
  test("simulation input add tag", async () => {
    render(<FormNote />);
  });
  test("simulation input", async () => {
    const { container } = render(<FormNote />);
    const inputTitle = screen.getByTestId("title-input-note");
    const inputDescription = screen.getByTestId("description-input-note");
    const button = screen.getByText("Save changes");
    const titleText = "hello world";
    const descriptionText =
      "Proident anim ad proident anim quis aute laboris amet cupidatat incididunt do occaecat sint.";
    const newTag = "new tag 2";
    const inputAddTags = screen.getByTestId("input-add-tags");
    const buttonAddTags = screen.getByTestId("input-add-tags-button");
    const workTag = screen.getByText("work");
    await act(async () => {
      fireEvent.change(inputTitle, { target: { value: titleText } });
      fireEvent.change(inputAddTags, { target: { value: newTag } });
      fireEvent.click(buttonAddTags);
      fireEvent.click(workTag);

      fireEvent.change(inputDescription, {
        target: { value: descriptionText },
      });
      fireEvent.click(button);
    });
    expect(inputAddTags).toBeInTheDocument();
    expect(inputTitle).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
