export default function ReviewCard({ review }) {
  const stars = "⭐".repeat(Math.round(review.rating / 2));
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-avatar">{review.userName[0].toUpperCase()}</div>
        <div className="reviewer-info">
          <span className="reviewer-name">{review.userName}</span>
          <span className="review-date">{review.date}</span>
        </div>
        <div className="review-rating">
          <span className="rating-num">{review.rating}/10</span>
          <span className="rating-stars">{stars}</span>
        </div>
      </div>
      <p className="review-text">{review.review}</p>
    </div>
  );
}
