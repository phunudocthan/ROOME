import { Router } from 'express';
import authRoutes from './auth.routes';
import roomRoutes from './room.routes';
import bookingRoutes from './booking.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);

export default router;
