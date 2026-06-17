import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const statusColor = { CONFIRMED: "#22c55e", CANCELLED: "#ef4444", PENDING: "#f59e0b" };

export default function MyBookings() {
  const { myBookings } = useBooking();
  const { user } = useAuth();
  const userBookings = myBookings.filter((b) => b.userId === user?.id);

  return (
    <div className="page-container">
      <h2>🎟 My Bookings</h2>
      {userBookings.length === 0 ? (
        <div className="empty-state">
          <p>No bookings yet.</p>
          <Link to="/" className="btn-primary" style={{ display: "inline-block", marginTop: "1rem" }}>Browse Movies</Link>
        </div>
      ) : (
        <div className="bookings-list">
          {userBookings.map((b) => (
            <div key={b.id} className="booking-card">
              <div className="booking-card-header">
                <h3>🎬 {b.movieTitle}</h3>
                <span className="booking-status" style={{ background: statusColor[b.status] }}>{b.status}</span>
              </div>
              <div className="booking-details">
                <div className="booking-detail-row"><span>Booking ID:</span><span>{b.id}</span></div>
                <div className="booking-detail-row"><span>Theatre:</span><span>{b.theatre}</span></div>
                <div className="booking-detail-row"><span>Screen:</span><span>{b.screen}</span></div>
                <div className="booking-detail-row"><span>Show Time:</span><span>{b.startTime} • {b.date}</span></div>
                <div className="booking-detail-row"><span>Seats:</span><span>{b.seats.join(", ")}</span></div>
                <div className="booking-detail-row total"><span>Amount Paid:</span><span>₹{b.totalAmount}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
