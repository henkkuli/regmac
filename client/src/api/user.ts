import { LoginRequest, RegisterRequest } from './messages/user';
import { NetworkError } from '@/api';

// TODO: Move to a constants file
const apiEndpoint = '//localhost:8000';

// tslint:disable:max-classes-per-file
class BaseError extends Error {
  public constructor(message?: string) {
    super(message);
    if (message) {
      this.message = message;
    }
  }
}
export class LoginError extends BaseError {}
export class RegisterError extends BaseError {}

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
    throw new LoginError((await response.json()).message);
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
    throw new RegisterError((await response.json()).message);
  }

  return;
}
