import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Environment,
  EnvironmentSchema,
} from 'src/enviroments/entities/environment.entity';
import envVariablesConfig from 'src/config/env-variables.config';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { EnvironmentsService } from 'src/enviroments/environments.service';

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
  controllers: [ProfilesController],
  providers: [ProfilesService, EnvironmentsService],
})
export class ProfilesModule {}
