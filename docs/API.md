# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Endpoints

### Register User
Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64a1b2c3d4e5f6a7b8c9d0e1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

### Login
Authenticate a user and receive a JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64a1b2c3d4e5f6a7b8c9d0e1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

### Get Current User
Get the authenticated user's information.

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "64a1b2c3d4e5f6a7b8c9d0e1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Logout
Logout the current user.

**Endpoint:** `POST /auth/logout`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": null,
  "message": "Logged out successfully"
}
```

---

## Room Endpoints

### Get All Rooms
Retrieve a list of all rooms with pagination.

**Endpoint:** `GET /rooms`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "64a1b2c3d4e5f6a7b8c9d0e1",
      "name": "Conference Room A",
      "description": "Large conference room with projector",
      "capacity": 20,
      "price": 50,
      "amenities": ["Projector", "Whiteboard", "WiFi"],
      "images": ["url1", "url2"],
      "available": true,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### Get Single Room
Retrieve details of a specific room.

**Endpoint:** `GET /rooms/:id`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "64a1b2c3d4e5f6a7b8c9d0e1",
    "name": "Conference Room A",
    "description": "Large conference room with projector",
    "capacity": 20,
    "price": 50,
    "amenities": ["Projector", "Whiteboard", "WiFi"],
    "images": ["url1", "url2"],
    "available": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Create Room (Admin Only)
Create a new room.

**Endpoint:** `POST /rooms`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "name": "Conference Room A",
  "description": "Large conference room with projector",
  "capacity": 20,
  "price": 50,
  "amenities": ["Projector", "Whiteboard", "WiFi"],
  "images": ["url1", "url2"]
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "64a1b2c3d4e5f6a7b8c9d0e1",
    "name": "Conference Room A",
    "description": "Large conference room with projector",
    "capacity": 20,
    "price": 50,
    "amenities": ["Projector", "Whiteboard", "WiFi"],
    "images": ["url1", "url2"],
    "available": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Update Room (Admin Only)
Update an existing room.

**Endpoint:** `PUT /rooms/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "name": "Updated Room Name",
  "price": 60
}
```

**Response:** `200 OK`

### Delete Room (Admin Only)
Delete a room.

**Endpoint:** `DELETE /rooms/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": null,
  "message": "Room deleted successfully"
}
```

---

## Booking Endpoints

### Get All Bookings
Get all bookings for the authenticated user (or all bookings if admin).

**Endpoint:** `GET /bookings`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "64a1b2c3d4e5f6a7b8c9d0e1",
      "user": {
        "id": "64a1b2c3d4e5f6a7b8c9d0e2",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "room": {
        "id": "64a1b2c3d4e5f6a7b8c9d0e3",
        "name": "Conference Room A",
        "price": 50
      },
      "startDate": "2023-12-01T00:00:00.000Z",
      "endDate": "2023-12-03T00:00:00.000Z",
      "totalPrice": 100,
      "status": "confirmed",
      "createdAt": "2023-11-01T00:00:00.000Z",
      "updatedAt": "2023-11-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Booking
Retrieve details of a specific booking.

**Endpoint:** `GET /bookings/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`

### Create Booking
Create a new room booking.

**Endpoint:** `POST /bookings`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "room": "64a1b2c3d4e5f6a7b8c9d0e3",
  "startDate": "2023-12-01T00:00:00.000Z",
  "endDate": "2023-12-03T00:00:00.000Z"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "64a1b2c3d4e5f6a7b8c9d0e1",
    "user": "64a1b2c3d4e5f6a7b8c9d0e2",
    "room": "64a1b2c3d4e5f6a7b8c9d0e3",
    "startDate": "2023-12-01T00:00:00.000Z",
    "endDate": "2023-12-03T00:00:00.000Z",
    "totalPrice": 100,
    "status": "pending",
    "createdAt": "2023-11-01T00:00:00.000Z",
    "updatedAt": "2023-11-01T00:00:00.000Z"
  }
}
```

### Cancel Booking
Cancel an existing booking.

**Endpoint:** `PATCH /bookings/:id/cancel`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "64a1b2c3d4e5f6a7b8c9d0e1",
    "status": "cancelled",
    ...
  }
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "message": "Error message here"
  }
}
```

### Common HTTP Status Codes
- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or failed
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Rate Limiting

- General API endpoints: 100 requests per 15 minutes
- Authentication endpoints: 5 requests per 15 minutes
