import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { otelSDK } from './telemetry';
import { microserviceConfig } from './kafka/microserviceConfig';

async function bootstrap() {
  // Start SDK before nestjs factory create
  await otelSDK.start();

  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // should be called after enableVersioning
  const config = new DocumentBuilder()
    .setTitle('NestJS Api')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // kafka
  app.connectMicroservice(microserviceConfig);
  
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
