# 📝 MyNotes – MERN Stack Notes Application

MyNotes is a full-stack notes management application built using the **MERN stack (MongoDB, Express, React, Node.js)**. It allows users to securely create, edit, delete, search, and filter notes with **JWT-based authentication**.

---

## 🚀 Features

* 🔐 User Authentication (Signup / Login / Logout) using JWT
* 🗂 Create, Read, Update, Delete (CRUD) Notes
* 🔎 Search notes by title or content
* 🎯 Filter & sort notes (A–Z, Z–A, newest, oldest)
* 🛡 Protected routes (only logged-in users can access notes)
* 📱 Responsive and clean UI

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Axios
* React Router
* CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (jsonwebtoken)
* bcryptjs

---

## 📂 Project Structure

```
MyNotes/
│
├── backend/
│   ├── controller/
│   │   ├── authController.js
│   │   └── notesController.js
│   ├── models/
│   │   ├── authModel.js
│   │   └── model.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/axiosInstance.js
│   │   ├── components/
│   │   │   ├── Auth.jsx
│   │   │   └── Note.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```

---

## 🔐 Authentication Flow

1. User registers with email & password
2. Password is hashed using **bcrypt**
3. On login, a **JWT token** is generated
4. Token is stored in `localStorage`
5. Axios interceptor attaches token to every request
6. Backend middleware validates JWT and protects routes

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/mynotes.git
cd mynotes
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

Update MongoDB connection string in `server.js`.

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

### Auth

* `POST /api/auth/signup` – Register user
* `POST /api/auth/login` – Login user

### Notes (Protected)

* `GET /api/notes/getNotes` – Fetch notes
* `POST /api/notes/notesAdd` – Add note
* `POST /api/notes/notesEdit` – Edit note
* `POST /api/notes/notesDelete` – Delete note

---

## 🧠 Learning Outcomes

* Implemented secure JWT authentication
* Used Axios interceptors for token handling
* Built protected backend routes with middleware
* Designed a full MERN-stack CRUD application
* Debugged real-world authentication issues

---

## 👤 Author

**Ismael**
Aspiring Full Stack Developer

Built as a learning project to understand real-world MERN authentication and CRUD workflows.
