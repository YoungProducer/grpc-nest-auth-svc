import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { protobufPackage } from './proto/auth.pb';
import { Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import {
  PGExceptionFilter,
  HttpExceptionFilter,
  RpcExceptionFilter,
} from 'grpc-nest-common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        package: protobufPackage,
        protoPath: join('node_modules/grpc-nest-proto/proto/auth.proto'),
      },
      bufferLogs: true,
    },
  );

  app.useLogger(app.get(Logger));
  app.useGlobalFilters(
    new PGExceptionFilter(),
    new RpcExceptionFilter(),
    new HttpExceptionFilter(),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen();
}
bootstrap();
