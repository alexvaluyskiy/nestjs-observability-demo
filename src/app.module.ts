import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { OpenTelemetryModuleConfig } from './telemetry'

@Module({
  imports: [HttpModule, OpenTelemetryModuleConfig],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
