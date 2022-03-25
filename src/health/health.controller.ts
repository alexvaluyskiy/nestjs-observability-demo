import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, SequelizeHealthIndicator, MicroserviceHealthIndicator, DiskHealthIndicator } from '@nestjs/terminus';
import { microserviceConfig } from 'src/kafka/microserviceConfig';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    //private sequilize: SequelizeHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('http-client', 'https://docs.nestjs.com'),
      //() => this.sequilize.pingCheck('db'),
      () => this.microservice.pingCheck('kafka', {
        transport: Transport.KAFKA,
      
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'nest-test',
            allowAutoTopicCreation: true,
          },
        }
      }),
      () => this.disk.checkStorage('disk', { thresholdPercent: 0.5, path: '/' })
    ]);
  }
}