import 'reflect-metadata';
import {
  useContainer as routingControllersUseContainer, useExpressServer, Action,
} from 'routing-controllers';
import { Container } from 'typedi';
import bodyParser from 'body-parser';
import { createConnection, useContainer as typeormUseContainer } from 'typeorm';
import express from 'express';
import config from './config';
import { UserController } from './controllers/user';
import session, { MemoryStore } from 'express-session';
import { User } from './models/user';
import { createDevelopmentData } from './developmentData';
import { SessionData } from './sessionData';

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
    cors: {
      origin: config.host.webServerAddress,
      credentials: true,
    },
    development: !config.host.production,
    currentUserChecker: async (action: Action) => {
      const currentSession = (action.request as express.Request).session;
      if (!currentSession) {
        return undefined;
      }
      const sessionData = currentSession.data as SessionData;
      if (!sessionData || !sessionData.userId) {
        return undefined;
      }
      return connection.manager.findOne(User, sessionData.userId);
    },
  });

  if (!config.host.production) {
    await createDevelopmentData();
  }

  app.listen(config.host.port);
}

main();
