import { EntityManager, ConnectionManager } from 'typeorm';
import Container from 'typedi';
import { UserController } from './controllers/user';
import { Form } from './models/form';
import { Field, FieldType } from './models/field';

// This file creates development data on the database

const username = 'Admin';
const password = 'DevelopingHard';

export async function createDevelopmentData() {
  const connectionManager = Container.get(ConnectionManager);
  const entityManager = connectionManager.get().manager;
  const userController = Container.get(UserController);

  // Create test user
  await userController.register({ username, password });

  // Create test form
  const form = new Form('Test form 1', []);
  form.id = '00000000-0000-0000-0000-000000000001';
  const fields = await form.fields;
  fields.push(new Field('', FieldType.STATIC_TEXT, {value: 'Welcome to this event.'}));
  fields.push(new Field('First name', FieldType.TEXT, {}));
  fields.push(new Field('Last name', FieldType.TEXT, {}));
  fields.push(new Field('', FieldType.STATIC_TEXT, {value: 'Could you please write some nice words to organizers?'}));
  fields.push(new Field('Nice words', FieldType.TEXTAREA, {}));

  await Promise.all(fields.map((field) => entityManager.save(field)));
  await entityManager.save(form);
}
