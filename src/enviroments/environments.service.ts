import { Injectable } from '@nestjs/common';
import { EnviromentDocument, Environment } from './entities/environment.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EnvironmentsService {
  constructor(
    @InjectModel(Environment.name)
    private environmentModel: Model<EnviromentDocument>,
  ) {}

  create(createEnvironmentDto: any) {
    return this.environmentModel.create(createEnvironmentDto);
  }

  async findAll() {
    return this.environmentModel.find();
  }
}
