import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { EnviromentsModule } from './enviroments/enviroments.module';

@Module({
  imports: [ProfilesModule, EnviromentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
