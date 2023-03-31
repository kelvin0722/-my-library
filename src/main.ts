import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000 }));
  await app.listen(3000);
}
bootstrap();
