import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { OpenTelemetryModuleConfig } from './telemetry'
import { databaseProviders } from './database/database.providers';
import { booksProviders } from './database/books.providers';

@Module({
  imports: [HttpModule, OpenTelemetryModuleConfig],
  controllers: [AppController],
  providers: [...databaseProviders, ...booksProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
