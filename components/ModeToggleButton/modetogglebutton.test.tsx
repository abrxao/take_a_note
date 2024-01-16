import React from "react";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import ModeToggleButton from ".";

// Simula a função window.matchMedia para evitar erros
window.matchMedia = jest.fn();

// Adiciona um tipo para window.matchMedia
declare global {
  interface Window {
    matchMedia: (query: string) => {
      matches: boolean;
      addListener: () => void;
      removeListener: () => void;
    };
  }
}

describe("ModeToggleButton", () => {
  test("renders button", () => {
    render(<ModeToggleButton />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("toggles theme on button click", async () => {
    render(<ModeToggleButton />);
    const button = screen.getByRole("button");

    // Simula a função window.matchMedia para evitar erros
    window.matchMedia.mockReturnValueOnce({
      matches: true,
      addListener: () => {},
      removeListener: () => {},
    });

    await act(async () => {
      fireEvent.click(button);
    });

    // Adicione as asserções adequadas com base no comportamento esperado
    // por exemplo, você pode verificar se a classe do botão foi alterada
    // ou se o tema foi alterado corretamente.

    expect(button).toMatchSnapshot(); // ajuste conforme necessário
  });

  // Adicione mais testes para cobrir outros cenários ou interações
});
