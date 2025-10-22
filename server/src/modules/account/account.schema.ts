import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema({ _id: false })
export class VerificationDetails {
  @Prop()
  id_card_front_url?: string;

  @Prop()
  id_card_back_url?: string;

  @Prop({ default: 'pending', enum: ['pending', 'verified', 'rejected'] })
  status: string;
}

const VerificationDetailsSchema = SchemaFactory.createForClass(VerificationDetails);

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, enum: ['tenant', 'landlord', 'admin'] })
  role: string;

  @Prop({ required: true })
  full_name: string;

  @Prop({ unique: true, sparse: true })
  phone_number?: string;

  @Prop({ default: 'default_avatar.png' })
  avatar_url: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ type: VerificationDetailsSchema })
  verification_details?: VerificationDetails;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Room' }] })
  rooms: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Contract' }] })
  contracts: MongooseSchema.Types.ObjectId[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);