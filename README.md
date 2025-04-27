# Memory Game (Find a Pair)

A web-based memory card matching game with user authentication, leaderboards, and score tracking.

## Features

- Interactive card matching gameplay
- User registration and authentication using JWT
- Leaderboard to track best scores
- Mobile-responsive design
- MongoDB for data storage

## Tech Stack

- Frontend: React with TypeScript, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Project Structure

```
/
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   └── src/                # Source code
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── contexts/       # Context providers
│       ├── hooks/          # Custom hooks
│       ├── services/       # API service functions
│       ├── types/          # TypeScript type definitions
│       └── utils/          # Utility functions
│
├── server/                 # Backend Node.js/Express application
│   ├── controllers/        # Route controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   └── utils/              # Utility functions
│
└── README.md               # Project documentation
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies for both client and server
3. Set up environment variables
4. Start the development servers

## Deployment

The application can be deployed to Render following the instructions in the deployment documentation.