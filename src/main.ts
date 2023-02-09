import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({transform:true, whitelist: true}));
  const config = new DocumentBuilder()
  .setTitle('CHG Consumption Seets')
  .setDescription('Api for keeping track of consumption sheets and its tasks')
  .setVersion('1.0')
  .addTag('apiV1')
  .addBearerAuth({type: 'apiKey'})
  .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
