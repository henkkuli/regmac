import {
    JsonController,
    Post,
    ForbiddenError,
    UnauthorizedError,
    BadRequestError,
    Body,
} from 'routing-controllers';
import { verifyPassword, hashPassword, verifyPasswordRequirements } from '../passwords';
import { Service } from 'typedi';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { User } from '../models/user';
import { LoginRequest, RegisterRequest, RegisterResponse, LoginReponse } from '../messages/user';

@Service()
@JsonController('/user')
export class UserController {
    @InjectManager()
    private entityManager!: EntityManager;

    @Post('/login')
    public async login(@Body({ validate: true, required: true }) body: LoginRequest): Promise<LoginReponse> {
        const { username, password } = body;
        const user = await this.entityManager.findOne(User, { where: { username } });
        if (!user || !user.passwordHash) {
            throw new UnauthorizedError('Invalid credentials');
        }
        const verificationResult = verifyPassword(password, user.passwordHash);
        if (!verificationResult.correct) {
            throw new UnauthorizedError('Invalid credentials');
        }
        if (verificationResult.needsUpdate) {
            user.passwordHash = hashPassword(password);
            this.entityManager.save(user);
        }
        // TODO: Login user

        return new LoginReponse();
    }

    @Post('/register')
    public async register(@Body({ validate: true, required: true }) body: RegisterRequest): Promise<RegisterResponse> {
        const { username, password } = body;
        const existingUser = await this.entityManager.findOne(User, { where: { username } });
        if (existingUser) {
            throw new ForbiddenError('User exists');
        }
        if (!verifyPasswordRequirements(password)) {
            throw new BadRequestError('Invalid password');
        }
        const user = new User(username, hashPassword(password));
        await this.entityManager.save(user);

        return new RegisterResponse();
    }
}
