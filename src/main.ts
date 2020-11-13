import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from '../libs/config/config';
import { Globals } from "../libs/config/globals";
declare const global: Globals;

async function bootstrap() {
  // instancia app...
  const app = await NestFactory.create(AppModule);
  // cors...
  app.enableCors();
  // configuraciones yaml...
  const { yamlConf } = config;
  global.$config = yamlConf;
  // inicio aplicacion...
  await app.listen(yamlConf.port);
}

bootstrap();
