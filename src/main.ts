import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Timeboxing')
    .setDescription('Plataforma para gestión del tiempo de actividades')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  // FIN SWAGGER

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
