import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { OpenTelemetryModuleConfig } from './telemetry'
import { databaseProviders } from './database/database.providers';
import { booksProviders } from './database/books.providers';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';

@Module({
  imports: [HttpModule, OpenTelemetryModuleConfig, TerminusModule],
  controllers: [AppController, HealthController],
  providers: [...databaseProviders, ...booksProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
