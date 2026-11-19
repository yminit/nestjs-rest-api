import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("REST API")
    .setDescription("REST API 문서")
    .setVersion("1.0.0")
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("", app, documentFactory, {
    customCssUrl:
      "https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css",
    customJs: [
      "https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js",
      "https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js",
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error: unknown) => {
  console.error("[BOOTSTRAP ERROR]", error);
  process.exitCode = 1;
});
