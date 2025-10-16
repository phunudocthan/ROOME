import { Router } from 'express';
import {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../controllers/room.controller';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.route('/').get(getRooms).post(protect, authorize('admin'), createRoom);

router
  .route('/:id')
  .get(getRoom)
  .put(protect, authorize('admin'), updateRoom)
  .delete(protect, authorize('admin'), deleteRoom);

export default router;
