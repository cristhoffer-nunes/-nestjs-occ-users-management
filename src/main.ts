import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Gerenciamento de usuários')
    .setDescription(
      'Este serviço é encarregado do gerenciamento de usuários internos no OCC.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  delete document.paths['/'].get;
  delete document.paths['/environments'].post;

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
