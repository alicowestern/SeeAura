import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Inquiry extends Document {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Template' }] })
  selectedTemplates: Types.ObjectId[];

  @Prop()
  message: string;

  @Prop({ default: 'pending', enum: ['pending', 'contacted', 'finalized'] })
  status: string;
}

export const InquirySchema = SchemaFactory.createForClass(Inquiry);
