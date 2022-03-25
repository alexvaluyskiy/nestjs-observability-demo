import { Controller, Get, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Book } from './database/models/book';
import { Client, ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { microserviceConfig } from './kafka/microserviceConfig';
import { KafkaEvent } from './kafka/kafka.event';

@Controller({ version: '1' })
export class AppController {
  constructor(
    private httpService: HttpService,
    @Inject('BOOKS_REPOSITORY')
    private booksRepository: typeof Book) {}

  @Client(microserviceConfig)
  client: ClientKafka;

  @Get("http")
  getHttp(): string {
    return "http";
  }

  @Get("http-client")
  async getHttpClient(): Promise<string> {
    await this.httpService.get('https://docs.nestjs.com').toPromise();
    return "http-client";
  }

  @Get("database")
  async getDatabase(): Promise<string> {
    var books = await this.booksRepository.findAll<Book>();
    return books[0].name;
  }

  @Get("kafka-publish")
  publishToKafka() {
    let message = new KafkaEvent();
    message.eventId = 1;
    message.name = "kafka-publish-test";
    message.date = new Date();

    this.client.emit<number>('entity-created', message);
    console.log(`Consumed sent: entity-created, eventId=${ message.eventId }, name=${ message.name }, date=${ message.date }`);
    return "kafka sent";
  }

  @EventPattern('entity-created')
  killDragon(data: KafkaEvent) {
    console.log(`Consumed message: entity-created, eventId=${ data.eventId }, name=${ data.name }, date=${ data.date }`);
  }
}
