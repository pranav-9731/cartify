# 🛒 Cartify

Full-stack shopping cart application built with **React (Vite)** on the frontend and **Node.js + Express** on the backend.

---

## 🚀 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (Atlas)  
- **Deployment:** Netlify (frontend) + Render (backend)

---

## 📁 Project Structure

```
cartify-main/
├── client/        # React (Vite) frontend
├── server/        # Express backend
└── netlify.toml   # Netlify build configuration
```

---

## 🖥️ Running Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/cartify.git
cd cartify-main
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```
PORT=4000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/cartify
JWT_SECRET=supersecret
```

Start backend:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:4000
```

---

### 3️⃣ Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file inside `/client`:

```
VITE_API_URL=http://localhost:4000/api
```

Start frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🌐 Deployment

### Backend (Render)

1. Push backend to GitHub.
2. Create new Web Service on Render.
3. Add Environment Variables:

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_secret
CLIENT_URL=https://your-frontend.netlify.app
```

4. Deploy.

Health check:

```
https://your-backend.onrender.com/api/health
```

---

### Frontend (Netlify)

1. Create site from GitHub.
2. Set Base Directory to:

```
client
```

3. Add Environment Variable:

```
VITE_API_URL=https://your-backend.onrender.com/api
```

4. Deploy.

---

## 🔍 API Routes

```
GET    /api/health
GET    /api/items
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/cart
```

---

## ⚠️ Common Issues

**CORS Error**
- Ensure `CLIENT_URL` matches your Netlify domain exactly (no trailing slash).

**404 on page refresh**
- Ensure `_redirects` exists inside `client/public/`:

```
/* /index.html 200
```

**Mongo connection error**
- Ensure `MONGODB_URI` includes the database name:

```
mongodb+srv://...mongodb.net/cartify-m
```

---

## 📜 License

MIT
