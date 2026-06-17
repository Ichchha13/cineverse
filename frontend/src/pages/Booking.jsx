import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { shows, movies } from "../data/movies";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";

const ROWS = ["A", "B", "C", "D", "E"];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8];
const BOOKED_SEATS = ["A3", "B5", "C1", "D4", "E7", "A6", "B2", "C8"];

export default function Booking() {
  const { showId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { lockSeat, isSeatLocked, confirmBooking } = useBooking();

  const show = shows.find((s) => s.id === showId);
  const movie = show ? movies.find((m) => m.id === show.movieId) : null;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null);

  if (!show || !movie) return <div className="page-container"><h2>Show not found</h2></div>;

  const getSeatStatus = (seatId) => {
    if (BOOKED_SEATS.includes(seatId)) return "booked";
    if (isSeatLocked(showId, seatId)) return "locked";
    if (selectedSeats.includes(seatId)) return "selected";
    return "available";
  };

  const toggleSeat = (seatId) => {
    const status = getSeatStatus(seatId);
    if (status === "booked" || status === "locked") return;
    if (status === "selected") {
      setSelectedSeats((prev) => prev.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length >= 6) {
        alert("Maximum 6 seats per booking");
        return;
      }
      setSelectedSeats((prev) => [...prev, seatId]);
    }
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) return;
    selectedSeats.forEach((s) => lockSeat(showId, s, user.id));
    const booking = confirmBooking({
      showId,
      movieTitle: movie.title,
      theatre: show.theatre,
      screen: show.screen,
      startTime: show.startTime,
      date: show.date,
      seats: selectedSeats,
      totalAmount: selectedSeats.length * show.price,
      userId: user.id,
      userName: user.name,
    });
    setBookingStatus(booking);
  };

  if (bookingStatus) {
    return (
      <div className="page-container">
        <div className="booking-success">
          <div className="success-icon">🎉</div>
          <h2>Booking Confirmed!</h2>
          <div className="booking-ticket">
            <div className="ticket-header">🎬 {bookingStatus.movieTitle}</div>
            <div className="ticket-row"><span>Booking ID:</span><span>{bookingStatus.id}</span></div>
            <div className="ticket-row"><span>Theatre:</span><span>{bookingStatus.theatre}</span></div>
            <div className="ticket-row"><span>Screen:</span><span>{bookingStatus.screen}</span></div>
            <div className="ticket-row"><span>Show Time:</span><span>{bookingStatus.startTime}</span></div>
            <div className="ticket-row"><span>Date:</span><span>{bookingStatus.date}</span></div>
            <div className="ticket-row"><span>Seats:</span><span>{bookingStatus.seats.join(", ")}</span></div>
            <div className="ticket-row total"><span>Total Amount:</span><span>₹{bookingStatus.totalAmount}</span></div>
            <div className="ticket-status">✅ {bookingStatus.status}</div>
          </div>
          <div className="success-btns">
            <button className="btn-primary" onClick={() => navigate("/my-bookings")}>View All Bookings</button>
            <button className="btn-secondary" onClick={() => navigate("/")}>Browse More Movies</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="booking-header">
        <h2>🎭 Select Seats</h2>
        <div className="show-info-bar">
          <span>🎬 {movie.title}</span>
          <span>📍 {show.theatre} • {show.screen}</span>
          <span>🕐 {show.startTime}</span>
          <span>₹{show.price}/seat</span>
        </div>
      </div>

      <div className="screen-label">🖥 SCREEN</div>

      <div className="seat-grid">
        {ROWS.map((row) => (
          <div key={row} className="seat-row">
            <span className="row-label">{row}</span>
            {COLS.map((col) => {
              const seatId = `${row}${col}`;
              const status = getSeatStatus(seatId);
              return (
                <button key={seatId} className={`seat seat-${status}`} onClick={() => toggleSeat(seatId)} title={seatId}>
                  {col}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="seat-legend">
        <span><span className="legend-box seat-available" /> Available</span>
        <span><span className="legend-box seat-selected" /> Selected</span>
        <span><span className="legend-box seat-booked" /> Booked</span>
        <span><span className="legend-box seat-locked" /> Locked</span>
      </div>

      <div className="booking-summary">
        <h3>Booking Summary</h3>
        {selectedSeats.length === 0 ? (
          <p className="no-seats">No seats selected. Click on available seats above.</p>
        ) : (
          <>
            <div className="summary-row"><span>Selected Seats:</span><span>{selectedSeats.join(", ")}</span></div>
            <div className="summary-row"><span>No. of Seats:</span><span>{selectedSeats.length}</span></div>
            <div className="summary-row"><span>Price per Seat:</span><span>₹{show.price}</span></div>
            <div className="summary-row total-row"><span>Total Amount:</span><span>₹{selectedSeats.length * show.price}</span></div>
            <div className="lock-notice">🔒 Seats will be locked for 5 minutes (Redis TTL simulation)</div>
            <button className="btn-primary btn-confirm" onClick={handleConfirmBooking}>
              Confirm Booking (₹{selectedSeats.length * show.price})
            </button>
          </>
        )}
      </div>
    </div>
  );
}
