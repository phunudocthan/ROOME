import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  description: string;
  capacity: number;
  price: number;
  amenities: string[];
  images: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a room name'],
      trim: true,
      maxlength: [100, 'Room name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a room description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    capacity: {
      type: Number,
      required: [true, 'Please provide room capacity'],
      min: [1, 'Capacity must be at least 1'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide room price'],
      min: [0, 'Price cannot be negative'],
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for searching
roomSchema.index({ name: 'text', description: 'text' });

export default mongoose.model<IRoom>('Room', roomSchema);
