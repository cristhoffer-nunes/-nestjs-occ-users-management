import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { EnvironmentsModule } from './enviroments/environments.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProfilesModule,
    EnvironmentsModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
