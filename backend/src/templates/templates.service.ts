import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template } from './schemas/template.schema';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<Template>,
    private logsService: LogsService,
  ) {}

  async findAll(): Promise<Template[]> {
    return this.templateModel.find({ isActive: true }).exec();
  }

  async findOne(id: string): Promise<Template> {
    const template = await this.templateModel.findById(id).exec();
    if (!template) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    return template;
  }

  async create(createTemplateDto: any, adminEmail?: string): Promise<Template> {
    const newTemplate = new this.templateModel(createTemplateDto);
    const saved = await newTemplate.save();

    await this.logsService.create({
      action: 'CREATE_TEMPLATE',
      target: 'Template',
      targetId: saved._id.toString(),
      adminEmail,
      details: `Created template: ${saved.title}`,
    });

    return saved;
  }

  async update(
    id: string,
    updateTemplateDto: any,
    adminEmail?: string,
  ): Promise<Template> {
    const updatedTemplate = await this.templateModel
      .findByIdAndUpdate(id, updateTemplateDto, { new: true })
      .exec();
    if (!updatedTemplate) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }

    await this.logsService.create({
      action: 'UPDATE_TEMPLATE',
      target: 'Template',
      targetId: id,
      adminEmail,
      details: `Updated template: ${updatedTemplate.title}`,
    });

    return updatedTemplate;
  }

  async remove(id: string, adminEmail?: string): Promise<void> {
    const template = await this.templateModel.findById(id).exec();
    if (!template) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }

    await this.templateModel.findByIdAndDelete(id).exec();

    await this.logsService.create({
      action: 'DELETE_TEMPLATE',
      target: 'Template',
      targetId: id,
      adminEmail,
      details: `Deleted template: ${template.title}`,
    });
  }
}
