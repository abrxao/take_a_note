import { act, fireEvent, render, screen } from "@testing-library/react";
import FormNote from ".";

test("simulation input", async () => {
  const { container } = render(<FormNote />);
  const inputTitle = screen.getByTestId("title-input-note");
  const inputDescription = screen.getByTestId("description-input-note");
  const button = screen.getByText("Save changes");
  const titleText = "hello world";
  const descriptionText =
    "Proident anim ad proident anim quis aute laboris amet cupidatat incididunt do occaecat sint.";

  await act(async () => {
    fireEvent.change(inputTitle, { target: { value: titleText } });
    fireEvent.change(inputDescription, { target: { value: descriptionText } });
    fireEvent.click(button);
  });
  expect(inputTitle).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
