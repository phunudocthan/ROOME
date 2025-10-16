import { Request, Response, NextFunction } from 'express';
import Room from '../models/Room.model';
import { AppError } from '../middlewares/error.middleware';

export const getRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const rooms = await Room.find().skip(skip).limit(limit);
    const total = await Room.countDocuments();

    res.status(200).json({
      success: true,
      data: rooms,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      throw new AppError('Room not found', 404);
    }

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const room = await Room.create(req.body);

    res.status(201).json({
      success: true,
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      throw new AppError('Room not found', 404);
    }

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      throw new AppError('Room not found', 404);
    }

    res.status(200).json({
      success: true,
      data: null,
      message: 'Room deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
