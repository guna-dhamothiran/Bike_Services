# BikeServe - Bike Service Booking System

A full-stack web application for managing bike service bookings, built with React.js and Node.js.

## Features

- User Authentication (Login/Signup)
- Service Booking System
- Admin Dashboard
- Owner Dashboard
- Real-time Status Updates
- Email Notifications
- Responsive Design

## Tech Stack

### Frontend
- React.js
- React Router DOM
- EmailJS for email notifications
- CSS for styling
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- EmailJS

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   MONGO_URL=your_mongodb_connection_string
   PORT=8080
   JWT_SECRET=your_jwt_secret
   ADMIN_CODE=Admin@123
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_app_password
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd Bike-services
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The application will be available at `http://localhost:5173`

## Environment Variables

### Backend (.env)
- `MONGO_URL`: MongoDB connection string
- `PORT`: Server port (default: 8080)
- `JWT_SECRET`: Secret key for JWT authentication
- `ADMIN_CODE`: Admin registration code
- `EMAIL_USER`: Gmail address for sending notifications
- `EMAIL_PASS`: Gmail app password

## API Endpoints

### Authentication
- POST `/api/auth/signup`: User registration
- POST `/api/auth/login`: User login
- POST `/api/admin/login`: Admin login

### Bookings
- POST `/api/booking`: Create new booking
- GET `/api/booking`: Get all bookings
- PUT `/api/booking/:id`: Update booking status
- DELETE `/api/booking/:id`: Delete booking

## Project Structure
```
bike-service/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── Bike-services/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   ├── public/
│   └── index.html
└── README.md
```

## Usage Instructions

1. **User Flow:**
   - Register/Login as a user
   - Browse available services
   - Book a service with pickup option
   - Track booking status
   - Receive email notifications

2. **Owner Flow:**
   - Access owner dashboard
   - View all bookings
   - Update service status
   - Export booking data


