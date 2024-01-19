import { Injectable } from '@nestjs/common';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { EnviromentDocument, Environment } from './entities/environment.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EnvironmentsService {
  constructor(
    @InjectModel(Environment.name)
    private environmentModel: Model<EnviromentDocument>,
  ) {}

  create(createEnvironmentDto: CreateEnvironmentDto) {
    return 'This action adds a new enviroment';
  }

  findAll() {
    return this.environmentModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} enviroment`;
  }

  update(id: number, updateEnvironmentDto: UpdateEnvironmentDto) {
    return `This action updates a #${id} enviroment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enviroment`;
  }
}
