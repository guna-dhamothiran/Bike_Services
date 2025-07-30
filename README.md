# BikeServe - Bike Service Booking System

A full-stack web application for managing bike service bookings, built with React.js and Node.js.

---

## 🔗 Demo Link

👉 [Live Demo](https://bike-services.vercel.app/)  

---
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
<img width="238" height="614" alt="Screenshot 2025-07-30 160132" src="https://github.com/user-attachments/assets/389a5839-791d-4edd-9cfd-39d6dbe7ca18" />

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

Sample ScreenShotes:
**HOME PAGES DETAILS:**

<img width="1366" height="768" alt="Screenshot 2025-07-30 035958" src="https://github.com/user-attachments/assets/a2177943-8e30-4dc0-b99d-2a1b5d9a77d0" />
<img width="1366" height="768" alt="Screenshot 2025-07-30 040015" src="https://github.com/user-attachments/assets/d68c1595-d13f-4ecb-ad7e-275bd0053422" />
<img width="1366" height="768" alt="Screenshot 2025-07-30 040037" src="https://github.com/user-attachments/assets/237c963c-c907-4cf6-a3ee-117b4172fc06" />
<img width="1366" height="768" alt="Screenshot 2025-07-30 040044" src="https://github.com/user-attachments/assets/efac497e-7e5e-4965-88d6-a3f617da26d0" />
<img width="1366" height="768" alt="Screenshot 2025-07-30 040100" src="https://github.com/user-attachments/assets/7a1ca838-c225-4dd5-99f2-69cfdfb69390" />



**BOOKING_FORM:**



<img width="1366" height="768" alt="Screenshot 2025-07-30 040556" src="https://github.com/user-attachments/assets/f1ece5bc-6221-437e-9fba-b738a9bf50b9" />
<img width="1077" height="154" alt="Screenshot 2025-07-30 040615" src="https://github.com/user-attachments/assets/e5111e79-64d4-47e0-939e-b8d388dafa6e" />
EMAIL CONFORMATION(USER):


<img width="1235" height="633" alt="Screenshot 2025-07-30 044224" src="https://github.com/user-attachments/assets/d91c7bb9-f646-43c6-a80f-e81717499fc0" />
**ADMIN DASHBOARD: **




<img width="1366" height="768" alt="Screenshot 2025-07-30 040630" src="https://github.com/user-attachments/assets/25295241-d6d3-4fe3-b070-ff34fa883872" />
<img width="1366" height="768" alt="Screenshot 2025-07-30 040734" src="https://github.com/user-attachments/assets/954b139f-0dd5-48d4-88d2-598aefd71fd3" />

