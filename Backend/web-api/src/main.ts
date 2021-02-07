import { readFileSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

async function bootstrap() {
  const https = process.env.SSL
    ? {
        httpsOptions: {
          key: readFileSync(process.env.SSL_KEY, 'utf8'),
          cert: readFileSync(process.env.SSL_CERT, 'utf8'),
        },
      }
    : {};

  const app = await NestFactory.create(AppModule, https);

  app.use(cookieParser());
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
    sessionToken: configService.get('AWS_SESSION_TOKEN'),
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
