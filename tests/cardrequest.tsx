import { act, fireEvent, render, screen } from "@testing-library/react";
import NoteCard from "@/components/NoteCard";
import Tag from "@/components/Tag";
import UserNotesSection from "@/sections/UserNotesSection";
import * as usehooks from "@uidotdev/usehooks";

const useIsClientSpy = jest.spyOn(usehooks, "useIsClient");

const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: "1679",
            title: "Duas tags",
            description:
              "Occaecat cillum incididunt pariatur amet est enim dolor sint magna et. Occaecat non nostrud consequat incididunt velit sint. Anim nostrud ut sit nostrud laboris adipisicing magna dolor do et. Quis in ad ea dolor non nulla et aute minim Lorem dolor esse.",
            tags: ["sim, outra!", "The Love"],
            createDate: "2024-01-15T15:18:26.971Z",
            favorite: false,
          },
          {
            id: "3637",
            title: "Nova nota",
            createDate: "2024-01-15T11:37:33.749Z",
            favorite: false,
            tags: ["The Love"],
          },
        ]),
    } as Response);
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

test("simulation input", async () => {
  useIsClientSpy.mockReturnValueOnce(true);
  render(<UserNotesSection />);
  //   const showingText = "hello world";
  //   const input = screen.getByTestId("input-test");
  //   const button = screen.getByTestId("input-send");
  //   act(() => {
  //     fireEvent.change(input, { target: { value: showingText } });
  //     fireEvent.click(button);
  //   });

  const test = await screen.findByText("no notes yet");
  expect(test).toBeInTheDocument();
});

// test("testing CEP query", async () => {
//   render(<Home />);
//   const showingText = "01001000";
//   const input = screen.getByTestId("cep-input-send");
//   const button = screen.getByTestId("cep-button");
//   await act(async () => {
//     fireEvent.change(input, { target: { value: showingText } });
//     fireEvent.click(button);
//   });

//   const logradouro = await screen.findByText("Logradouro: Praça da Sé");
//   expect(logradouro).toBeInTheDocument();
//   const localidade = await screen.findByText("Localidade: São Paulo");
//   expect(localidade).toBeInTheDocument();
//   const bairro = await screen.findByText("Bairro: Sé");
//   expect(bairro).toBeInTheDocument();
// });
