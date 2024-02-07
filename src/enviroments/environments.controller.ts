/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { EnvironmentsService } from './environments.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('environments')
@Controller('environments')
export class EnvironmentsController {
  constructor(private readonly environmentsService: EnvironmentsService) {}

  @Post()
  create(@Body() createEnvironmentDto: any) {
    return this.environmentsService.create(createEnvironmentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os ambientes',
    description: 'Listar todos os ambientes cadastrados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Atualizar o perfil em todos os ambientes.',
  })
  async findAll() {
    const environments = await this.environmentsService.findAll();

    return environments.map((env) => {
      const {
        adminKey,
        appKey,
        totp_code,
        email,
        password,
        __v,
        active,
        ...rest
      } = env.toObject();
      return rest;
    });
  }
}
