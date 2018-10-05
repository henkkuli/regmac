import 'reflect-metadata';
import { createExpressServer, useContainer as routingControllersUseContainer } from 'routing-controllers';
import { Container } from 'typedi';
import bodyParser from 'body-parser';
import { createConnection, useContainer as typeormUseContainer } from 'typeorm';
import express from 'express';
import config from './config';
import { UserController } from './controllers/user';
import cors from 'cors';
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

  const app = createExpressServer({
    controllers: [
      UserController,
    ],
  }) as express.Application;

  app.use(cors());
  app.use(bodyParser.json());

  app.listen(config.host.port);
}

main();
