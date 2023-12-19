import { Injectable } from '@nestjs/common';
import { CreateEnviromentDto } from './dto/create-enviroment.dto';
import { UpdateEnviromentDto } from './dto/update-enviroment.dto';

@Injectable()
export class EnviromentsService {
  create(createEnviromentDto: CreateEnviromentDto) {
    return 'This action adds a new enviroment';
  }

  findAll() {
    return `This action returns all enviroments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enviroment`;
  }

  update(id: number, updateEnviromentDto: UpdateEnviromentDto) {
    return `This action updates a #${id} enviroment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enviroment`;
  }
}
