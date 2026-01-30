import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inquiry } from './schemas/inquiry.schema';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class InquiriesService {
  constructor(
    @InjectModel(Inquiry.name) private inquiryModel: Model<Inquiry>,
    private logsService: LogsService,
  ) {}

  async create(createInquiryDto: any): Promise<Inquiry> {
    const newInquiry = new this.inquiryModel(createInquiryDto);
    return newInquiry.save();
  }

  async findAll(): Promise<Inquiry[]> {
    return this.inquiryModel.find().populate('selectedTemplates').exec();
  }

  async updateStatus(
    id: string,
    status: string,
    adminEmail?: string,
  ): Promise<Inquiry | null> {
    const inquiry = await this.inquiryModel.findById(id).exec();
    const updated = await this.inquiryModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();

    if (updated) {
      await this.logsService.create({
        action: 'UPDATE_INQUIRY',
        target: 'Inquiry',
        targetId: id,
        adminEmail,
        details: `Changed inquiry status for ${updated.customerName} to ${status.toUpperCase()}`,
      });
    }

    return updated;
  }
}
