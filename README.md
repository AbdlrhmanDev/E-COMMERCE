# E-Commerce Project

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Project Structure

```
├── backend/          # Node.js & Express backend
│   ├── src/
│   │   ├── config/   # Configuration files
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
│
└── frontend/         # React frontend
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── utils/
    │   └── App.tsx
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- User authentication (register/login)
- Product management
- Shopping cart functionality
- Order processing
- Admin dashboard
- Responsive design
- Secure payment integration
- User profile management
- Product search and filtering
- Order tracking

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Express Validator
- Bcrypt for password hashing

### Frontend
- React with TypeScript
- Vite for build tooling
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- React Query for state management

## Development

- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:5173

## License

MIT 