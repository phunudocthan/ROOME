import apiClient from '@/lib/axios';
import { ApiResponse, User, Room, Booking } from '@/types';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post<ApiResponse<{ token: string; user: User }>>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await apiClient.post<ApiResponse<{ token: string; user: User }>>('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post<ApiResponse<null>>('/auth/logout');
    return response.data;
  },
};

export const roomService = {
  getRooms: async (params?: { page?: number; limit?: number }) => {
    const response = await apiClient.get<ApiResponse<Room[]>>('/rooms', { params });
    return response.data;
  },

  getRoom: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Room>>(`/rooms/${id}`);
    return response.data;
  },

  createRoom: async (data: Partial<Room>) => {
    const response = await apiClient.post<ApiResponse<Room>>('/rooms', data);
    return response.data;
  },

  updateRoom: async (id: string, data: Partial<Room>) => {
    const response = await apiClient.put<ApiResponse<Room>>(`/rooms/${id}`, data);
    return response.data;
  },

  deleteRoom: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<null>>(`/rooms/${id}`);
    return response.data;
  },
};

export const bookingService = {
  getBookings: async () => {
    const response = await apiClient.get<ApiResponse<Booking[]>>('/bookings');
    return response.data;
  },

  getBooking: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Booking>>(`/bookings/${id}`);
    return response.data;
  },

  createBooking: async (data: Partial<Booking>) => {
    const response = await apiClient.post<ApiResponse<Booking>>('/bookings', data);
    return response.data;
  },

  cancelBooking: async (id: string) => {
    const response = await apiClient.patch<ApiResponse<Booking>>(`/bookings/${id}/cancel`);
    return response.data;
  },
};
