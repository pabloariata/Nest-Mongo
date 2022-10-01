import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api'); // Agrega 'api' a la ruta de todos los controladores
  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //para transformar query params de string a numbers
      transformOptions: {
        enableImplicitConversion: true //para transformar query params de string a numbers
      }
    })
  );
  
  await app.listen(3000);
}
bootstrap();
