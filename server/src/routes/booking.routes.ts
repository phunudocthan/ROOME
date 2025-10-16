import { Router } from 'express';
import {
  getBookings,
  getBooking,
  createBooking,
  cancelBooking,
} from '../controllers/booking.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// All booking routes require authentication
router.use(protect);

router.route('/').get(getBookings).post(createBooking);

router.route('/:id').get(getBooking);

router.patch('/:id/cancel', cancelBooking);

export default router;
