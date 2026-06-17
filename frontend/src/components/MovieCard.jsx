import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="movie-poster-wrap">
        <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
        <div className="movie-overlay">
          <Link to={`/movies/${movie.id}`} className="btn-book-now">View Details</Link>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="rating">⭐ {movie.rating}</span>
          <span className="language">{movie.language}</span>
          <span className="duration">⏱ {movie.duration}m</span>
        </div>
        <div className="genre-tags">
          {movie.genre.map((g) => (
            <span key={g} className="genre-tag">{g}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
