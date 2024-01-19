import { Module } from '@nestjs/common';
import { EnvironmentsService } from './environments.service';
import { EnvironmentsController } from './environments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Environment, EnvironmentSchema } from './entities/environment.entity';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import envVariablesConfig from 'src/config/env-variables.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Environment.name,
        schema: EnvironmentSchema,
        collection: envVariablesConfig.MONGODB_COLLECTION,
      },
    ]),
    ConfigModule.forRoot(),
    HttpModule,
  ],
  controllers: [EnvironmentsController],
  providers: [EnvironmentsService],
})
export class EnvironmentsModule {}
