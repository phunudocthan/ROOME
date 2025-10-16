export interface User {
  id: string
  email: string
  name: string
  role?: 'user' | 'admin'
  createdAt?: string
}

export interface Room {
  id: string
  name: string
  capacity: number
  description?: string
  price: number
  isAvailable: boolean
}

export interface Booking {
  id: string
  userId: string
  roomId: string
  startDate: string
  endDate: string
  status: 'pending' | 'confirmed' | 'cancelled'
  totalPrice: number
}
