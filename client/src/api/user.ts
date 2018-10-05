import { LoginRequest, RegisterRequest } from './messages/user';
import { NetworkError } from '@/api';

// TODO: Move to a constants file
const apiEndpoint = '//localhost:8000';

// tslint:disable:max-classes-per-file
export class LoginError extends Error { }
export class RegisterError extends Error { }

export async function login(username: string, password: string) {
  let response: Response;
  try {
    const message: LoginRequest = {
      username,
      password,
    };
    response = await fetch(`${apiEndpoint}/user/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    throw new NetworkError('Failed to reach server');
  }

  if (!response.ok) {
    throw new LoginError(response.statusText);
  }

  return;
}

export async function register(username: string, password: string) {
  let response: Response;
  try {
    const message: RegisterRequest = {
      username,
      password,
    };
    response = await fetch(`${apiEndpoint}/user/register`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    throw new NetworkError('Failed to reach server');
  }

  if (!response.ok) {
    throw new RegisterError(response.statusText);
  }

  return;
}
