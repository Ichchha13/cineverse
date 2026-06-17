import { movies, shows } from "../data/movies";

export default function AdminDashboard() {
  return (
    <div className="page-container">
      <h2>⚙️ Admin Dashboard</h2>
      <div className="admin-stats">
        <div className="stat-card"><div className="stat-num">{movies.length}</div><div className="stat-label">Total Movies</div></div>
        <div className="stat-card"><div className="stat-num">{shows.length}</div><div className="stat-label">Total Shows</div></div>
        <div className="stat-card"><div className="stat-num">3</div><div className="stat-label">Theatres</div></div>
        <div className="stat-card"><div className="stat-num">127</div><div className="stat-label">Bookings Today</div></div>
      </div>

      <div className="admin-section">
        <h3>🎬 Manage Movies</h3>
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Genre</th><th>Rating</th><th>Duration</th><th>Actions</th></tr></thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.id}>
                <td>{m.title}</td>
                <td>{m.genre.join(", ")}</td>
                <td>⭐ {m.rating}</td>
                <td>{m.duration}m</td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-section">
        <h3>🎭 Manage Shows</h3>
        <table className="admin-table">
          <thead><tr><th>Movie</th><th>Theatre</th><th>Screen</th><th>Time</th><th>Price</th><th>Actions</th></tr></thead>
          <tbody>
            {shows.map((s) => {
              const m = movies.find((mv) => mv.id === s.movieId);
              return (
                <tr key={s.id}>
                  <td>{m?.title}</td>
                  <td>{s.theatre}</td>
                  <td>{s.screen}</td>
                  <td>{s.startTime}</td>
                  <td>₹{s.price}</td>
                  <td><button className="btn-edit">Edit</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
