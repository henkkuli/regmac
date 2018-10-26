// tslint:disable:max-classes-per-file

export class User {
  public username!: string;
}

export class LoginRequest {
  public username!: string;
  public password!: string;
}

export class LoginReponse {
  public user!: User;
}

export class RegisterRequest {
  public username!: string;
  public password!: string;
}

export class RegisterResponse {
  public user!: User;
}

export class MeResponse {
  public user?: User;
}
