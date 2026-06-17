import { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [lockedSeats, setLockedSeats] = useState({});
  const [myBookings, setMyBookings] = useState([]);

  const lockSeat = (showId, seatId, userId) => {
    const key = `${showId}:${seatId}`;
    if (lockedSeats[key]) return false; // already locked
    setLockedSeats((prev) => ({ ...prev, [key]: { userId, lockedAt: Date.now() } }));
    return true;
  };

  const unlockSeat = (showId, seatId) => {
    const key = `${showId}:${seatId}`;
    setLockedSeats((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const isSeatLocked = (showId, seatId) => {
    return !!lockedSeats[`${showId}:${seatId}`];
  };

  const confirmBooking = (bookingData) => {
    const booking = {
      id: "B" + Date.now(),
      ...bookingData,
      status: "CONFIRMED",
      bookedAt: new Date().toISOString(),
    };
    setMyBookings((prev) => [booking, ...prev]);
    // release locks
    bookingData.seats.forEach((s) => unlockSeat(bookingData.showId, s));
    return booking;
  };

  return (
    <BookingContext.Provider value={{ lockedSeats, lockSeat, unlockSeat, isSeatLocked, confirmBooking, myBookings }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
