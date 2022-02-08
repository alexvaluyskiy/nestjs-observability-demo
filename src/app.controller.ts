import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(private httpService: HttpService) {}

  @Get("http")
  getHttp(): string {
    return "http";
  }

  @Get("http-client")
  async getHttpClient(): Promise<string> {
    await this.httpService.get('https://www.apple.com/').toPromise();
    return "http-client";
  }
}
