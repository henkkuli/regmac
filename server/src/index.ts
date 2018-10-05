import 'reflect-metadata';
import {
  createExpressServer, useContainer as routingControllersUseContainer, useExpressServer,
} from 'routing-controllers';
import { Container } from 'typedi';
import bodyParser from 'body-parser';
import { createConnection, useContainer as typeormUseContainer } from 'typeorm';
import express from 'express';
import config from './config';
import { UserController } from './controllers/user';
import cors from 'cors';
import session from 'express-session';
import { User } from './models/user';

async function main() {
  routingControllersUseContainer(Container);
  typeormUseContainer(Container);

  const connection = await createConnection({
    type: config.database.type,
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    synchronize: true,
    logging: true,
    entities: [
      User,
    ],
  });

  const app = express();

  app.use(session({
    cookie: {
      maxAge: 60 * 60 * 1000,   // 1 hour
      secure: config.host.production,
    },
    secret: config.host.sessionSecret,
    resave: false,
    rolling: true,
    saveUninitialized: true,
  }));
  // TODO: Implement a storage in database
  app.use(bodyParser.json());

  useExpressServer(app, {
    controllers: [
      UserController,
    ],
    cors: true,
    development: !config.host.production,
  });

  app.listen(config.host.port);
}

main();
