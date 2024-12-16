import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PersonalizedRecommendation } from "./index";

global.fetch = jest.fn();

const mockGenresResponse = (genres) =>
  Promise.resolve({
    json: () => Promise.resolve({ genres }),
  });

const mockSearchResponse = (results) =>
  Promise.resolve({
    json: () => Promise.resolve({ results }),
  });

describe("PersonalizedRecommendation", () => {
    beforeEach(() => {
        fetch.mockClear();
      });
    
      afterEach(() => {
        fetch.mockReset();
      });

  it("renders the form and title based on mood", () => {
    render(
      <MemoryRouter initialEntries={["/filmes"]}>
        <Routes>
          <Route path="/:mood" element={<PersonalizedRecommendation />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Recomendação personalizada de filmes")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Nome do filme:")).toBeInTheDocument();
    expect(screen.getByLabelText("Gênero:")).toBeInTheDocument();
    expect(screen.getByLabelText("Ano:")).toBeInTheDocument();
    expect(screen.getByLabelText("Diretor:")).toBeInTheDocument();
    expect(screen.getByText("Buscar")).toBeInTheDocument();
  });

  it("fetches genres and displays them in the dropdown", async () => {
    fetch.mockImplementation((url) => {
      console.log("Fetch called with URL:", url);
  
      if (url.includes("genre/movie/list")) {
        return Promise.resolve({
          json: () => Promise.resolve({ genres: [{ id: 1, name: "Action", release_date: '2024-02-03' }] }),
        });
      }
      if (url.includes("discover/movie")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              results: [
                { id: 1, title: "Action Movie", poster_path: "/poster1.jpg", release_date: '2024-02-03' },
              ],
            }),
        });
      }
      return Promise.reject(new Error(`Unhandled URL: ${url}`));
    });
  
    render(
      <MemoryRouter initialEntries={["/filmes"]}>
        <Routes>
          <Route path="/:mood" element={<PersonalizedRecommendation />} />
        </Routes>
      </MemoryRouter>
    );
  
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("genre/movie/list")
      );
    });
  
    expect(screen.getByLabelText("Gênero:")).toHaveTextContent("Selecione um gênero");
  
    fireEvent.click(screen.getByText("Buscar"));
  
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("discover/movie"));
    });
  
    expect(screen.getByText("Action Movie")).toBeInTheDocument();
  });

  it("handles errors gracefully", async () => {
    fetch.mockImplementation(() => Promise.reject("API Error"));

    render(
      <MemoryRouter initialEntries={["/filmes"]}>
        <Routes>
          <Route path="/:mood" element={<PersonalizedRecommendation />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Buscar"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    expect(
      screen.getByText("Nenhum resultado encontrado.")
    ).toBeInTheDocument();

    fetch.mockClear();
  });
  
});
