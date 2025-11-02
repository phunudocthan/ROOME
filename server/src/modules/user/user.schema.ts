import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

// Define the Role Enum
export enum UserRole {
  TENANT = 'tenant',
  LANDLORD = 'landlord',
  ADMIN = 'admin',
}

// Define the VerificationStatus Enum
export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

// Embedded schema for Landlord verification
@Schema({ _id: false })
export class VerificationDetails {
  @Prop({ type: String })
  id_card_front_url: string;

  @Prop({ type: String })
  id_card_back_url: string;

  @Prop({
    type: String,
    enum: VerificationStatus,
    default: VerificationStatus.PENDING,
  })
  status: VerificationStatus;
}

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false }) // select: false hides it by default
  password: string;

  @Prop({ required: true })
  full_name: string; // <-- MODIFIED: Changed from 'name'

  @Prop({
    type: String,
    required: true,
    enum: UserRole, // <-- MODIFIED: Uses the enum
  })
  role: UserRole;

  @Prop({ type: String, unique: true, sparse: true, default: null })
  phone_number: string; // <-- NEW

  @Prop({ type: String, default: 'default_avatar.png' })
  avatar_url: string; // <-- NEW

  @Prop({ default: true })
  isActive: boolean;

  // --- Embedded & Relational ---

  @Prop({ type: VerificationDetails, default: null })
  verification_details: VerificationDetails; // <-- NEW

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Room' }])
  rooms: MongooseSchema.Types.ObjectId[]; // <-- NEW

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Contract' }])
  contracts: MongooseSchema.Types.ObjectId[]; // <-- NEW
}

export const UserSchema = SchemaFactory.createForClass(User);
