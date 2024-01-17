import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const fs = require('fs');
  const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    httpsOptions,
  });

  // const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  //   cors: true,
  // });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: [
      'https://127.0.0.1:3000/',
      'https://localhost:3000/',
      'https://192.168.18.152:3000/',
      'https://127.0.0.1:3000',
      'https://localhost:3000',
      'https://192.168.18.152:3000',
    ],
    credentials: true,
  });
  await app.listen(4000);
}
bootstrap();
