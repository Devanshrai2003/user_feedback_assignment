# User Feedback Assignment 

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4-green.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5-green.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-blueviolet.svg)](https://tailwindcss.com/)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Devanshrai2003/user_feedback_assignment.git
```

### 2. Install dependencies

```bash
# Install all dependencies (both frontend and backend)
npm install
```

### 3. Environment Setup

Create a `.env` file in the client/feedback_form directory:

**Client .env**
```
VITE_API_URL=http://localhost:3000
```

## Running the Application

### Quick Start (Recommended)

```bash
# Start the backend server
npm run start

# In a new terminal, start the frontend
npm run dev
```

The application will be available at:
- Frontend: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3000](http://localhost:3000)

## Usage

### Submitting Feedback

Navigate to the home page and fill out the feedback form with:
- Your name
- Email address
- Feedback category (Suggestion, Bug Report, Feature Request)
- Your feedback message

### Viewing Feedback (Admin)

Navigate to the dashboard page by clicking the "Dashboard" button in the navigation bar to view all submitted feedback. Each feedback item displays:
- Submitter information
- Category
- Content
- Submission time
- Current status (not reviewed, reviewed)

## API Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|-----------------|
| POST   | /feedback | Submit new feedback | - |
| GET    | /feedback | Retrieve all feedback entries | category, sort |
