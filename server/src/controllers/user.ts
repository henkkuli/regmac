import {
    JsonController,
    Post,
    BodyParam,
    ForbiddenError,
    UnauthorizedError,
    BadRequestError,
} from 'routing-controllers';
import { verifyPassword, hashPassword, verifyPasswordRequirements } from '../passwords';
import { Service } from 'typedi';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { User } from '../models/user';

@Service()
@JsonController('/user')
export class UserController {
    @InjectManager()
    private entityManager!: EntityManager;

    @Post('/login')
    public async login(@BodyParam('name') name: string, @BodyParam('password') password: string) {
        const user = await this.entityManager.findOne(User, {where: {name}});
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
    }

    @Post('/register')
    public async register(@BodyParam('name') name: string, @BodyParam('password') password: string) {
        const user = await this.entityManager.findOne(User, {where: {name}});
        if (user) {
            throw new ForbiddenError('User exists');
        }
        if (!verifyPasswordRequirements(password)) {
            throw new BadRequestError('Invalid password');
        }
        const newUser = new User(name, hashPassword(password));
        await this.entityManager.save(newUser);
    }
}
