# ROOME Server

This is the backend API for the ROOME project, built with Express.js, TypeScript, and MongoDB.

## 📁 Project Structure

```
server/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.ts   # MongoDB connection
│   │   └── jwt.ts        # JWT configuration
│   ├── controllers/      # Route controllers
│   │   ├── auth.controller.ts
│   │   ├── room.controller.ts
│   │   └── booking.controller.ts
│   ├── models/           # Mongoose models
│   │   ├── User.model.ts
│   │   ├── Room.model.ts
│   │   └── Booking.model.ts
│   ├── routes/           # API routes
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── room.routes.ts
│   │   └── booking.routes.ts
│   ├── middlewares/      # Express middlewares
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── validate.middleware.ts
│   │   ├── notFound.middleware.ts
│   │   └── rateLimit.middleware.ts
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   │   └── asyncHandler.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   └── index.ts          # Application entry point
├── .env.example          # Environment variables template
├── nodemon.json          # Nodemon configuration
├── tsconfig.json         # TypeScript configuration
├── jest.config.js        # Jest configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- MongoDB Atlas account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
   - Set your MongoDB Atlas connection string
   - Set a secure JWT secret
   - Configure other environment variables

### Development

Run the development server with auto-reload:
```bash
npm run dev
```

The server will start on http://localhost:5000 (or the PORT specified in .env)

### Build

Build the TypeScript code:
```bash
npm run build
```

### Production

Start the production server:
```bash
npm start
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)

### Rooms
- `GET /api/rooms` - Get all rooms (with pagination)
- `GET /api/rooms/:id` - Get single room
- `POST /api/rooms` - Create room (admin only)
- `PUT /api/rooms/:id` - Update room (admin only)
- `DELETE /api/rooms/:id` - Delete room (admin only)

### Bookings
- `GET /api/bookings` - Get user's bookings (or all for admin)
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id/cancel` - Cancel booking

### Health Check
- `GET /health` - Check server health

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## 📦 Key Dependencies

- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **TypeScript** - Type safety
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Express Rate Limit** - Rate limiting
- **Zod/Joi** - Validation

## 🔐 Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting on authentication routes
- Helmet for security headers
- CORS configuration
- MongoDB injection sanitization
- Input validation

## 📝 Code Style

- ESLint for linting
- Prettier for code formatting
- TypeScript for type checking

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 🤝 Contributing

Please read the main project README for contribution guidelines.

## 📄 License

This project is part of a graduation project.
