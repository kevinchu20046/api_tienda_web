import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ConfigEnv from '../config'
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('DOCUMENTATION API WEB STORE')
    .setDescription('En este apartado se muestra la documentacion de la api para el consumo de los end points')
    .setVersion('1.0')
    .addTag('Users')
    .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentation', app, documentFactory);


  await app.listen(ConfigEnv.get_port());
}

bootstrap();
