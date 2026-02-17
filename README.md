### 🛒 Cartify

Full-stack shopping cart application built with **React (Vite)** on the frontend and **Node.js + Express** on the backend.

---

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** JSON, MongoDB
- **Deployment:** Netlify (frontend) + render (backend)

---

## Project Structure
```cartify-main/
├── client/ # React (Vite) frontend
├── server/ # Express backend
└── netlify.toml # Netlify build config
```
---

## 🖥️ Running Locally

# Clone & install
git clone https://github.com/yourusername/cartify.git
cd cartify-main
PORT=4000
CLIENT_URL=http://localhost:5173   # Frontend URL
JWT_SECRET=supersecret  # Required if using authentication
VITE_API_URL=http://localhost:4000

## 🌐 Deployment
# Render (Backend)
Push code to GitHub.
Create a new render project → connect your repo.
Add variables under Settings → Variables:
CLIENT_URL=https://your-frontend.netlify.app
JWT_SECRET=supersecret

Redeploy → your backend will be at
https://your-service.app.

# Netlify (Frontend)

Create new site from GitHub → select client/ as base dir.

In Site configuration → Environment variables, add:
VITE_API_URL=https://your-backend.up.app/api


Deploy → frontend will be live at
https://your-frontend.netlify.app.

## Route Check

Backend exposes:
GET /api/health → { "status": "ok" }
Use this to verify render is running correctly.

## Bugs

CORS error: Ensure CLIENT_URL on backend matches your Netlify domain exactly (no trailing slash).
404 on /items: Use /api/items not /items.
Backend crash: Remove any manual PORT env var. Use 0.0.0.0 in app.listen.

Note: The backend may not work at first so please refresh.

📜 License
MIT
