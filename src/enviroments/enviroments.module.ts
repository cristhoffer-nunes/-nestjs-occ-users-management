import { Module } from '@nestjs/common';
import { EnviromentsService } from './enviroments.service';
import { EnviromentsController } from './enviroments.controller';

@Module({
  controllers: [EnviromentsController],
  providers: [EnviromentsService],
})
export class EnviromentsModule {}
