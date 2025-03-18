import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';
import * as fs from 'fs';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { DatabaseExceptionFilter } from './filters/database-exception.filter';
import "./instrument";

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Logger.log(`Origin customer_host:${process.env.FE_HOST}`, 'OriginHost');

  const options = {
    origin: [/^(.*)/, process.env.FE_HOST],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for,traceparent,request-id,request-context,user-agent',
    exposedHeaders: 'X-TUTORSPLAN-KEY,X-TUTORSPLAN-KEY-EXPIRES',
  };

  // if (process.env.NODE_ENV !== 'production') {
  const config = new DocumentBuilder()
    .setTitle('V_CRM API')
    .setDescription('API for managing voter data, zones, and related operations.')
    .setVersion('1.0')
    .addTag('V_CRM')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('/swagger', app, document);
  // }

  app.use(helmet());
  app.use(cookieParser());
  app.use(
    compression({
      level: 6,
      filter: shouldCompress,
    }),
  );
  app.enableCors(options);
  // for handling database exceptions globally
  app.useGlobalFilters(new DatabaseExceptionFilter());

  await app.listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();

function shouldCompress(req, res) {
  if (
    req.headers['x-no-compression'] &&
    req.headers['x-no-compression'] === 'true'
  ) {
    return false;
  }

  return compression.filter(req, res);
}
