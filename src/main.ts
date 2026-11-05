import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';
import { configureSecurity, parseCorsOrigins } from './security.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const origins = parseCorsOrigins(
    config.get<string>('CORS_ORIGINS'),
    config.get<string>('NODE_ENV'),
  );

  configureSecurity(app, origins);

  await app.listen(config.get<string>('PORT') ?? 3000);
}
await bootstrap();
