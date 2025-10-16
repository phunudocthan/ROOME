# ROOME System Architecture

## 📐 Overview

ROOME is a fullstack room booking management system built as a graduation project. It follows a **monorepo architecture** with clear separation between frontend and backend.

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      Client (React)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐│
│  │  Pages   │  │Components│  │ Services │  │ Contexts││
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘│
│                         ↓                                │
│                    Axios API Client                      │
└─────────────────────────────────────────────────────────┘
                          ↓ HTTP/REST
┌─────────────────────────────────────────────────────────┐
│                   Server (NestJS)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Auth    │  │  User    │  │  Room    │  [Modules]   │
│  │ Module   │  │ Module   │  │ Module   │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│         ↓              ↓              ↓                  │
│    Controllers    Controllers    Controllers            │
│         ↓              ↓              ↓                  │
│     Services       Services       Services              │
│         ↓              ↓              ↓                  │
│                  Mongoose ODM                            │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  MongoDB Atlas                           │
│  Collections: users, rooms, bookings                     │
└─────────────────────────────────────────────────────────┘
```

## 🎯 System Components

### Frontend (client/)

**Technology**: React 18 + TypeScript + Vite

**Key Features**:
- Single Page Application (SPA)
- Client-side routing with React Router
- Global state management via Context API
- Axios-based API communication with interceptors
- JWT token storage in localStorage

**Structure**:
```
client/src/
├── pages/          # Route components (HomePage, LoginPage, etc.)
├── components/     # Reusable UI components
├── contexts/       # React Context providers (AuthContext)
├── services/       # API service layer (auth.service, api client)
├── hooks/          # Custom React hooks
├── routes/         # Route configuration
└── types/          # TypeScript type definitions
```

**Data Flow**:
1. User interacts with Pages/Components
2. Components call Service methods
3. Services use Axios client with interceptors
4. Interceptors add JWT token to headers
5. Response data updates Context/State
6. UI re-renders

### Backend (server/)

**Technology**: NestJS 10 + TypeScript + Mongoose

**Key Features**:
- Modular architecture with feature modules
- JWT-based authentication with Passport
- MongoDB integration via Mongoose ODM
- Global validation pipes
- CORS enabled for frontend communication
- Environment-based configuration

**Modules**:

1. **AuthModule** (`modules/auth/`)
   - User authentication (login/register)
   - JWT token generation
   - Passport strategies (Local, JWT)
   - Auth guards for route protection

2. **UserModule** (`modules/user/`)
   - User CRUD operations
   - Password hashing with bcrypt
   - User schema and validation

3. **RoomModule** (`modules/room/`)
   - Room management
   - Availability tracking
   - Room search and filtering

**Data Flow**:
1. Client sends HTTP request with JWT
2. NestJS middleware validates token
3. Guards check authorization
4. Controllers handle routing
5. Services implement business logic
6. Mongoose models interact with MongoDB
7. Response sent back to client

## 🔐 Authentication Flow

```
1. User submits login credentials
   ↓
2. Frontend → POST /api/auth/login
   ↓
3. LocalStrategy validates credentials
   ↓
4. AuthService generates JWT token
   ↓
5. Token + user data returned to client
   ↓
6. Client stores token in localStorage
   ↓
7. Subsequent requests include token in Authorization header
   ↓
8. JwtStrategy validates token on protected routes
```

## 🗄️ Database Schema

### Users Collection
```typescript
{
  _id: ObjectId,
  email: string (unique, required),
  password: string (hashed, required),
  name: string (required),
  role: 'user' | 'admin' (default: 'user'),
  isActive: boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Rooms Collection
```typescript
{
  _id: ObjectId,
  name: string (required),
  capacity: number (required),
  description: string,
  price: number (required),
  isAvailable: boolean (default: true),
  amenities: string[],
  imageUrl: string,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Development Workflow

### Local Setup

```bash
# Install dependencies
yarn install

# Setup environment variables
cp client/.env.example client/.env
cp server/.env.example server/.env

# Run development servers
yarn dev:all  # Both frontend and backend
```

### Build Process

```bash
# Build frontend
cd client && yarn build
# Output: client/dist/

# Build backend
cd server && yarn build
# Output: server/dist/
```

### Testing

```bash
# Backend unit tests
cd server && yarn test

# Backend e2e tests
cd server && yarn test:e2e
```

## 🔄 API Endpoints

### Auth Routes (`/api/auth`)
- `POST /login` - User login
- `POST /register` - User registration
- `GET /me` - Get current user (protected)
- `POST /logout` - Logout (protected)

### User Routes (`/api/users`)
- `GET /` - List all users
- `GET /:id` - Get user by ID
- `PATCH /:id` - Update user (protected)
- `DELETE /:id` - Delete user (protected)

### Room Routes (`/api/rooms`)
- `GET /` - List all rooms
- `GET /available` - List available rooms
- `GET /:id` - Get room by ID
- `POST /` - Create room (protected)
- `PATCH /:id` - Update room (protected)
- `DELETE /:id` - Delete room (protected)

## 🛡️ Security Considerations

1. **Password Security**: Bcrypt hashing with salt rounds
2. **JWT Security**: Secret keys in environment variables
3. **CORS**: Configured to allow only frontend origin
4. **Validation**: Class-validator for DTO validation
5. **Guards**: JWT guards on protected routes

## 📦 Deployment Strategy

### Frontend
- Build: `vite build`
- Recommended: Vercel, Netlify
- Environment: Production API URL

### Backend
- Build: `nest build`
- Recommended: Render, Railway, Heroku
- Environment: Production MongoDB URI

### Database
- MongoDB Atlas (cloud-hosted)
- Separate clusters for dev/prod

## 🔮 Future Extensions

- **Booking Module**: Room reservation system
- **Payment Integration**: Online payment processing
- **Email Notifications**: Booking confirmations
- **Admin Dashboard**: Management interface
- **Real-time Updates**: WebSocket integration
- **File Uploads**: Room images storage

## 👥 Team Roles

This architecture supports 5 team members working on:
1. Frontend UI/UX
2. Frontend state management & API integration
3. Backend authentication & user management
4. Backend room & booking logic
5. Database design & DevOps

## 📚 References

- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Vite Documentation](https://vitejs.dev/)
