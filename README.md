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
└── frontend/         # React frontend (coming soon)
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

### Frontend Setup (Coming Soon)

The frontend part of the application will be added soon.

## Features

- User authentication (register/login)
- Product management
- Shopping cart
- Order processing
- Admin dashboard

## License

MIT 