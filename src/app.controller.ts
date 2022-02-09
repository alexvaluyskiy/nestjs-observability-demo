import { Controller, Get, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Book } from './database/models/book';

@Controller({ version: '1' })
export class AppController {
  constructor(
    private httpService: HttpService,
    @Inject('BOOKS_REPOSITORY')
    private booksRepository: typeof Book) {}

  @Get("http")
  getHttp(): string {
    return "http";
  }

  @Get("http-client")
  async getHttpClient(): Promise<string> {
    await this.httpService.get('https://www.apple.com/').toPromise();
    return "http-client";
  }

  @Get("database")
  async getDatabase(): Promise<string> {
    var books = await this.booksRepository.findAll<Book>();
    return books[0].name;
  }
}
