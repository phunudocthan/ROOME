import { Request, Response, NextFunction } from 'express';
import Booking from '../models/Booking.model';
import Room from '../models/Room.model';
import { AppError } from '../middlewares/error.middleware';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getBookings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.user?.role === 'admin' ? {} : { user: req.user?.id };
    const bookings = await Booking.find(query)
      .populate('user', 'name email')
      .populate('room', 'name price');

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('room', 'name price');

    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    // Check authorization
    if (
      req.user?.role !== 'admin' &&
      booking.user._id.toString() !== req.user?.id
    ) {
      throw new AppError('Not authorized to access this booking', 403);
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { room, startDate, endDate } = req.body;

    // Check if room exists
    const roomDoc = await Room.findById(room);
    if (!roomDoc) {
      throw new AppError('Room not found', 404);
    }

    if (!roomDoc.available) {
      throw new AppError('Room is not available', 400);
    }

    // Check for overlapping bookings
    const overlapping = await Booking.findOne({
      room,
      status: { $ne: 'cancelled' },
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) },
        },
      ],
    });

    if (overlapping) {
      throw new AppError('Room is already booked for these dates', 400);
    }

    // Calculate total price
    const days = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const totalPrice = days * roomDoc.price;

    // Create booking
    const booking = await Booking.create({
      user: req.user?.id,
      room,
      startDate,
      endDate,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    // Check authorization
    if (
      req.user?.role !== 'admin' &&
      booking.user.toString() !== req.user?.id
    ) {
      throw new AppError('Not authorized to cancel this booking', 403);
    }

    if (booking.status === 'cancelled') {
      throw new AppError('Booking is already cancelled', 400);
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
