# Database Schema Documentation

## Overview

ROOME uses MongoDB as the database. The application connects to MongoDB Atlas for production and can use a local MongoDB instance for development.

## Collections

### Users Collection

Stores user account information.

**Collection Name:** `users`

**Schema:**
```javascript
{
  _id: ObjectId,
  name: String,          // Required, max 50 characters
  email: String,         // Required, unique, lowercase
  password: String,      // Required, hashed with bcrypt
  role: String,          // Enum: ['admin', 'user'], default: 'user'
  createdAt: Date,       // Auto-generated
  updatedAt: Date        // Auto-generated
}
```

**Indexes:**
- `email` (unique)

**Example Document:**
```json
{
  "_id": "64a1b2c3d4e5f6a7b8c9d0e1",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$XYZ...",
  "role": "user",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

---

### Rooms Collection

Stores room information for booking.

**Collection Name:** `rooms`

**Schema:**
```javascript
{
  _id: ObjectId,
  name: String,          // Required, max 100 characters
  description: String,   // Required, max 1000 characters
  capacity: Number,      // Required, min 1
  price: Number,         // Required, min 0 (price per day)
  amenities: [String],   // Array of amenities
  images: [String],      // Array of image URLs
  available: Boolean,    // Default: true
  createdAt: Date,       // Auto-generated
  updatedAt: Date        // Auto-generated
}
```

**Indexes:**
- Text index on `name` and `description` for search functionality

**Example Document:**
```json
{
  "_id": "64a1b2c3d4e5f6a7b8c9d0e3",
  "name": "Conference Room A",
  "description": "Large conference room with modern facilities",
  "capacity": 20,
  "price": 50,
  "amenities": ["Projector", "Whiteboard", "WiFi", "Air Conditioning"],
  "images": [
    "https://example.com/images/room1.jpg",
    "https://example.com/images/room2.jpg"
  ],
  "available": true,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

---

### Bookings Collection

Stores room booking information.

**Collection Name:** `bookings`

**Schema:**
```javascript
{
  _id: ObjectId,
  user: ObjectId,        // Reference to Users collection
  room: ObjectId,        // Reference to Rooms collection
  startDate: Date,       // Required
  endDate: Date,         // Required, must be after startDate
  totalPrice: Number,    // Required, calculated based on duration and room price
  status: String,        // Enum: ['pending', 'confirmed', 'cancelled'], default: 'pending'
  createdAt: Date,       // Auto-generated
  updatedAt: Date        // Auto-generated
}
```

**Indexes:**
- Compound index on `user` and `status`
- Compound index on `room`, `startDate`, and `endDate`

**Example Document:**
```json
{
  "_id": "64a1b2c3d4e5f6a7b8c9d0e5",
  "user": "64a1b2c3d4e5f6a7b8c9d0e1",
  "room": "64a1b2c3d4e5f6a7b8c9d0e3",
  "startDate": "2023-12-01T00:00:00.000Z",
  "endDate": "2023-12-03T00:00:00.000Z",
  "totalPrice": 100,
  "status": "confirmed",
  "createdAt": "2023-11-01T00:00:00.000Z",
  "updatedAt": "2023-11-01T00:00:00.000Z"
}
```

---

## Relationships

### User → Bookings
One-to-Many relationship. A user can have multiple bookings.

### Room → Bookings
One-to-Many relationship. A room can have multiple bookings.

### ER Diagram

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│    User     │         │   Booking    │         │    Room     │
├─────────────┤         ├──────────────┤         ├─────────────┤
│ _id         │◄────────│ user         │         │ _id         │
│ name        │         │ room         │────────►│ name        │
│ email       │         │ startDate    │         │ description │
│ password    │         │ endDate      │         │ capacity    │
│ role        │         │ totalPrice   │         │ price       │
│ createdAt   │         │ status       │         │ amenities   │
│ updatedAt   │         │ createdAt    │         │ images      │
└─────────────┘         │ updatedAt    │         │ available   │
                        └──────────────┘         │ createdAt   │
                                                 │ updatedAt   │
                                                 └─────────────┘
```

---

## Validation Rules

### User
- Email must be valid and unique
- Password must be at least 6 characters
- Name cannot exceed 50 characters

### Room
- Capacity must be at least 1
- Price cannot be negative
- Name cannot exceed 100 characters
- Description cannot exceed 1000 characters

### Booking
- End date must be after start date
- Room must exist and be available
- No overlapping bookings for the same room
- Total price is automatically calculated based on duration and room price

---

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Create a database user with password
4. Whitelist your IP address or use 0.0.0.0/0 for development
5. Get the connection string and update the `.env` file:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/roome?retryWrites=true&w=majority
```

---

## Indexes

Proper indexes are created to optimize query performance:

1. **users.email** - Unique index for user email lookup
2. **rooms (name, description)** - Text index for search functionality
3. **bookings (user, status)** - Compound index for user's bookings by status
4. **bookings (room, startDate, endDate)** - Compound index for checking availability

---

## Best Practices

1. Always use Mongoose models to interact with the database
2. Enable validation at the schema level
3. Use transactions for operations that modify multiple documents
4. Implement proper error handling for database operations
5. Use indexes wisely to optimize query performance
6. Sanitize user input to prevent NoSQL injection
7. Regularly backup your database
8. Monitor database performance and optimize as needed
