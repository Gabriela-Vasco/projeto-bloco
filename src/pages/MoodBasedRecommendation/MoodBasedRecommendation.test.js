import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MoodBasedRecommendation } from "./index";

global.fetch = jest.fn();

const mockResponse = (results) =>
  Promise.resolve({
    json: () => Promise.resolve({ results }),
  });

describe("MoodBasedRecommendation", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders the mood buttons and title", () => {
    render(
      <MemoryRouter initialEntries={["/filmes"]}>
        <Routes>
          <Route path="/:mood" element={<MoodBasedRecommendation />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Recomendações baseadas no seu humor - Filmes")
    ).toBeInTheDocument();

    expect(screen.getByText("😊")).toBeInTheDocument();
    expect(screen.getByText("❤️")).toBeInTheDocument();
    expect(screen.getByText("😢")).toBeInTheDocument();
    expect(screen.getByText("😱")).toBeInTheDocument();
  });

  it("displays loading state when fetching recommendations", async () => {
    fetch.mockImplementation(() => mockResponse([]));

    render(
      <MemoryRouter initialEntries={["/filmes"]}>
        <Routes>
          <Route path="/:mood" element={<MoodBasedRecommendation />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("😊"));

    expect(screen.getByText("Carregando recomendações...")).toBeInTheDocument();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  it("fetches and displays recommendations for 'alegria'", async () => {
    const mockMovies = [
      { id: 1, title: "Happy Movie", poster_path: "/poster1.jpg" },
      { id: 2, title: "Another Happy Movie", poster_path: "/poster2.jpg" },
    ];

    fetch.mockImplementation(() => mockResponse(mockMovies));

    render(
      <MemoryRouter initialEntries={["/filmes"]}>
        <Routes>
          <Route path="/:mood" element={<MoodBasedRecommendation />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("😊"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText("Happy Movie")).toBeInTheDocument();
    expect(screen.getByText("Another Happy Movie")).toBeInTheDocument();

    expect(screen.getByAltText("Happy Movie")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/poster1.jpg"
    );
    expect(screen.getByAltText("Another Happy Movie")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/poster2.jpg"
    );
  });

  it("handles errors", async () => {
    fetch.mockImplementation(() => Promise.reject("500 error"));

    render(
      <MemoryRouter initialEntries={["/filmes"]}>
        <Routes>
          <Route path="/:mood" element={<MoodBasedRecommendation />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("😢"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.queryByText("Carregando recomendações...")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Drama Movie")).not.toBeInTheDocument();
  });
});
