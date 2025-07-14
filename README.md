# Full-Stack File Management Web Application

A modern full-stack web application that allows users to register, log in, upload, and manage files securely. Built with Node.js/Express backend and a Next.js/React frontend.

---

## Features

- **User Authentication:** Secure registration and login using JWT tokens.
- **File Upload & Management:** Upload PDF, JPG, JPEG, or PNG files (up to 5MB). Files are stored on the server, and metadata is saved in MongoDB.
- **File Listing:** View uploaded files with details like name, type.
- **Modern UI:** Responsive, user-friendly interface built with Next.js, React, and Tailwind CSS.
- **Secure API:** All file operations are protected by authentication middleware.

---

## Tech Stack

**Frontend:**
- Next.js (App Router)
- React
- Redux Toolkit
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (file uploads)
- JWT (authentication)

---

## Project Structure

```
Full-Stack-File-Management/
  backend/      # Express server, API, models, controllers, middleware
  my-app/       # Next.js frontend (React, Redux, Tailwind CSS)
```

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Backend Setup
```bash
cd backend
npm install
# Create a .env file with your MongoDB URI and JWT secret
# Example .env:
# MONGO_URI=mongodb://localhost:27017/your-db
# JWT_SECRET=your_jwt_secret
npm start
```

### Frontend Setup
```bash
cd my-app
npm install
npm run dev
```

### Environment Variables
- Configure your backend `.env` as shown above.
- The frontend expects the backend to run on `http://localhost:5000` by default (see `my-app/lib/api/api.js`).

---

## Usage
1. Register a new user or log in with existing credentials.
2. Upload files from the dashboard View uploaded files.(PDF, JPG, JPEG, PNG, max 5MB).
3. View uploaded files.

---

## License

This project is licensed under the MIT License. # file-management
# file-management-app
