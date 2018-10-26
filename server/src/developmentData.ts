import { EntityManager } from 'typeorm';
import Container from 'typedi';
import { UserController } from './controllers/user';

// This file creates development data on the database

const username = 'Admin';
const password = 'DevelopingHard';

export async function createDevelopmentData() {
  const entityManager = Container.get(EntityManager);
  const userController = Container.get(UserController);

  await userController.register({ username, password });
}
