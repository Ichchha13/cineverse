# 🎬 CineVerse — Movie Discovery & Booking Platform

A full-stack movie discovery and ticket booking platform built with **React.js**, inspired by Netflix and BookMyShow. CineVerse allows users to browse movies, read reviews, select seats, and book tickets — with role-based access for Users, Theatre Owners, and Admins.

🌐 **Live Demo:** [ichchha13.github.io/cineverse](https://ichchha13.github.io/cineverse/)

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login & registration with token-based auth
- 👮 **Role-Based Access Control** — USER, THEATRE_OWNER, ADMIN roles
- 🎥 **Movie Catalog** — Search, filter by genre, and sort movies
- ⭐ **Reviews & Ratings** — Users can add reviews and rate movies
- 🎭 **Seat Selection** — Interactive seat layout with lock/available/booked states
- 🎟 **Booking System** — End-to-end booking flow with confirmation ticket
- 📋 **My Bookings** — View all past bookings
- ⚙️ **Admin Dashboard** — Manage movies and shows (Admin only)
- 📱 **Responsive Design** — Works on all screen sizes

---

## 🛠 Tech Stack

| Layer | Technology |

|---|---|

| Frontend | React.js, Vite |

| Routing | React Router DOM |

| State Management | React Context API |

| Styling | Custom CSS |

| Auth | JWT (simulated) |

| Database (concept) | PostgreSQL + MongoDB |

| Cache (concept) | Redis |

| Messaging (concept) | RabbitMQ |

| DevOps | Docker, GitHub Actions |

| Deployment | GitHub Pages |

---

## 📁 Project Structure

 cineverse/
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD pipeline
├── frontend/
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── pages/            # Screen-level components
│       ├── context/          # Global state
│       └── data/             # Mock data
└── README.md



---

## 🚀 Getting Started


# Clone the repository

git clone https://github.com/Ichchha13/cineverse.git

cd cineverse/frontend

npm install

npm run dev

🔑 Demo Login

Role User----Email user@cineverse.com----Password password123

Role Admin----Email admin@cineverse.com----Password admin123


🔄 CI/CD Pipeline

Every push to main automatically:

✅ Installs dependencies
✅ Builds the React app
✅ Deploys to GitHub Pages

👤 Author
Ichchha13 — github.com/Ichchha13


