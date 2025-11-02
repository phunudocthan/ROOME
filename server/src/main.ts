// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- YOU WERE MISSING THIS PART ---
  // Define the Swagger config first
  const config = new DocumentBuilder()
    .setTitle('Roome API')
    .setDescription('The API documentation for the Roome project')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('rooms')
    .addBearerAuth() // For JWT
    .build();
  // --- END OF MISSING PART ---

  // Now you can create the document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 8080;
  await app.listen(port);

  console.log(`🚀 Server is running on http://localhost:${port}/api`);
  // Add this log so you remember the Swagger URL
  console.log(`📚 Swagger docs available at http://localhost:${port}/api-docs`);
}
bootstrap();
