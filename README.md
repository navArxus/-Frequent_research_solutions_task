# 🧾 Multi-Step User Profile Form (React + Node.js + MongoDB)

This project is a full-stack multi-step user profile update form built with:

- 🧠 **React (Frontend)** — Multi-step forms, real-time image preview, username availability check with debouncing.
- 📦 **Express (Backend)** — Handles image uploads and user data submission.
- 🗃️ **MongoDB (Mongoose)** — Stores all submitted profile data.

---

## 🚀 Features

### ✅ Frontend
- Multi-step form UI (Personal Info → Professional Info → Location & Subscription)
- Live profile image preview and validation (<2MB)
- Image upload to Express server with progress feedback
- Real-time **username availability check** (with debounce)
- Field-level validation (password, required fields, conditional logic)
- Final preview & submit

### ✅ Backend
- REST API using Express.js
- File upload using `multer` to local `/uploads` directory
- CORS enabled for frontend integration
- MongoDB model to store user profile
- Endpoint to check **username availability**

---

## 🛠️ Tech Stack

| Layer       | Tech Stack                  |
|-------------|-----------------------------|
| Frontend    | React, Tailwind CSS, Lodash |
| Backend     | Node.js, Express.js, Multer |
| Database    | MongoDB, Mongoose           |

---
