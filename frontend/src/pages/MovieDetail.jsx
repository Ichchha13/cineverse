import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movies, shows, reviews as reviewData } from "../data/movies";
import ReviewCard from "../components/ReviewCard";
import { useAuth } from "../context/AuthContext";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const movie = movies.find((m) => m.id === id);
  const movieShows = shows.filter((s) => s.movieId === id);
  const movieReviews = reviewData[id] || [];

  const [newReview, setNewReview] = useState({ rating: 8, review: "" });
  const [localReviews, setLocalReviews] = useState(movieReviews);
  const [submitted, setSubmitted] = useState(false);

  if (!movie) return <div className="page-container"><h2>Movie not found</h2></div>;

  const avgRating = localReviews.length
    ? (localReviews.reduce((a, r) => a + r.rating, 0) / localReviews.length).toFixed(1)
    : movie.rating;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.review.trim()) return;
    const review = {
      id: "r" + Date.now(),
      userId: user.id,
      userName: user.name,
      rating: newReview.rating,
      review: newReview.review,
      date: new Date().toISOString().split("T")[0],
    };
    setLocalReviews([review, ...localReviews]);
    setNewReview({ rating: 8, review: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="page-container">
      <div className="movie-detail-hero">
        <img src={movie.posterUrl} alt={movie.title} className="detail-poster" />
        <div className="detail-info">
          <h1>{movie.title}</h1>
          <div className="detail-meta">
            <span className="rating-big">⭐ {avgRating}</span>
            <span>{movie.language}</span>
            <span>⏱ {movie.duration} min</span>
            <span>📅 {movie.releaseDate}</span>
          </div>
          <div className="genre-tags" style={{ marginBottom: "1rem" }}>
            {movie.genre.map((g) => <span key={g} className="genre-tag">{g}</span>)}
          </div>
          <p className="detail-description">{movie.description}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Cast:</strong> {movie.cast.join(", ")}</p>
        </div>
      </div>

      <div className="shows-section">
        <h2>🎭 Available Shows</h2>
        {movieShows.length === 0 ? (
          <p>No shows available.</p>
        ) : (
          <div className="shows-grid">
            {movieShows.map((show) => (
              <div key={show.id} className="show-card">
                <div className="show-theatre">{show.theatre}</div>
                <div className="show-screen">{show.screen}</div>
                <div className="show-time">🕐 {show.startTime}</div>
                <div className="show-price">₹{show.price}</div>
                {user ? (
                  <button className="btn-primary" onClick={() => navigate(`/booking/${show.id}`)}>
                    Book Seats
                  </button>
                ) : (
                  <button className="btn-primary" onClick={() => navigate("/login")}>
                    Login to Book
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="reviews-section">
        <h2>💬 Reviews ({localReviews.length})</h2>

        {user && (
          <div className="add-review-form">
            <h3>Write a Review</h3>
            {submitted && <div className="success-msg">✅ Review submitted successfully!</div>}
            <form onSubmit={handleSubmitReview}>
              <label>Rating: {newReview.rating}/10</label>
              <input
                type="range" min="1" max="10" value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: +e.target.value })}
              />
              <textarea
                rows="3"
                placeholder="Share your thoughts about this movie..."
                value={newReview.review}
                onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
              />
              <button type="submit" className="btn-primary">Submit Review</button>
            </form>
          </div>
        )}

        <div className="reviews-list">
          {localReviews.map((r) => <ReviewCard key={r.id} review={r} />)}
        </div>
      </div>
    </div>
  );
}
