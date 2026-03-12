# 📸 Gallery App (MERN + Cloudinary)

A full-stack **image gallery application** where users can upload, view, and delete images.
Images are stored in the cloud and associated with individual user accounts.

This project demonstrates a **production-style MERN architecture** with cloud storage and deployment.

---

## 🚀 Live Demo

Frontend: https://your-vercel-link.vercel.app
Backend API: https://gallery-backend-sgma.onrender.com

---

## 🧠 Features

* 🔐 User Authentication (Register / Login)
* 🖼 Upload images to cloud storage
* 📂 Personal gallery for each user
* 🗑 Delete images (removes from database + cloud)
* 📱 Mobile-friendly UI
* 🔍 Fullscreen image viewer
* 👆 Long-press delete interaction
* 👈👉 Swipe navigation between images

---

## 🏗 Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer (file handling)

### Database

* MongoDB Atlas

### Cloud Storage

* Cloudinary

### Deployment

* Frontend → Vercel
* Backend → Render

---

## 📁 Project Architecture

Frontend → Vercel
Backend → Render
Images → Cloudinary
Database → MongoDB Atlas

Flow:

User Upload → React → Express API → Cloudinary → MongoDB → Gallery Display

---

## 📦 Installation

Clone the repository:

```
git clone https://github.com/mudassardevr/gallery-frontend.git
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file:

```
VITE_API_URL=https://gallery-backend-sgma.onrender.com
```

---

## 📸 Screenshots

(Add screenshots of your gallery UI here)

---

## ✨ Future Improvements

* Masonry / Pinterest style gallery layout
* Infinite scrolling
* Drag & drop image upload
* Image lazy loading
* User profile page

---

## 👨‍💻 Author

Mudassar khan
BCA Student | MERN Stack Developer
