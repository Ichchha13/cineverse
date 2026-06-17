import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { movies } from "../data/movies";

const allGenres = ["All", "Action", "Sci-Fi", "Drama", "Thriller", "Adventure", "Crime", "History"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = movies
    .filter((m) => m.title.toLowerCase().includes(search.toLowerCase()))
    .filter((m) => selectedGenre === "All" || m.genre.includes(selectedGenre))
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "duration") return a.duration - b.duration;
      return 0;
    });

  return (
    <div className="page-container">
      <div className="hero-banner">
        <h1>🎬 Discover Amazing Movies</h1>
        <p>Book tickets for the latest blockbusters</p>
      </div>

      <div className="filters-bar">
        <input
          type="text"
          placeholder="🔍 Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="filter-select">
          {allGenres.map((g) => <option key={g}>{g}</option>)}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
          <option value="rating">Sort: Rating</option>
          <option value="title">Sort: Title</option>
          <option value="duration">Sort: Duration</option>
        </select>
      </div>

      <div className="results-count">{filtered.length} movies found</div>

      <div className="movies-grid">
        {filtered.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>No movies found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
