import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnviromentsService } from './enviroments.service';
import { CreateEnviromentDto } from './dto/create-enviroment.dto';
import { UpdateEnviromentDto } from './dto/update-enviroment.dto';

@Controller('enviroments')
export class EnviromentsController {
  constructor(private readonly enviromentsService: EnviromentsService) {}

  @Post()
  create(@Body() createEnviromentDto: CreateEnviromentDto) {
    return this.enviromentsService.create(createEnviromentDto);
  }

  @Get()
  findAll() {
    return this.enviromentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enviromentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnviromentDto: UpdateEnviromentDto) {
    return this.enviromentsService.update(+id, updateEnviromentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enviromentsService.remove(+id);
  }
}
