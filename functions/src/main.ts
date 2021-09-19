import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as express from "express";
import * as functions from "firebase-functions";

const server = express();

async function bootstrap(expressInstance) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  return app.init();
}

bootstrap(server)
  .then(() => console.log("Nest Ready"))
  .catch((err) => console.error("Nest broken", err));

export const api = functions
  .runWith({ maxInstances: 1 })
  .https.onRequest(server);
