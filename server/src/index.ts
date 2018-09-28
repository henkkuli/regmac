import 'reflect-metadata';
import { createExpressServer, useContainer as routingControllersUseContainer } from 'routing-controllers';
import { Container } from 'typedi';
import * as bodyParser from 'body-parser';
import { createConnection, useContainer as typeormUseContainer } from 'typeorm';
import * as express from 'express';
import config from './config';

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
      'models/*.ts',
    ],
  });

  const app = createExpressServer({
    controllers: [
      'controllers/*.ts',
    ],
  }) as express.Application;

  app.use(bodyParser.json());

  app.listen(config.host.port);
}

main();
