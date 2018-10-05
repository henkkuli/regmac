import * as crypto from 'crypto';
import * as path from 'path';
import * as nbp from './nbp';

// Hash function used to store passwords. Change this to correspond
// to newer standards when needed
const HASH_FUNCTION = 'sha512';

nbp.init(path.join(__dirname, 'top_488132'), 488132);

export function verifyPasswordRequirements(password: string) {
    if (password.length < 8) {
         return false;
    }
    return !nbp.isCommonPassword(password);
}

export function verifyPassword(password: string, passwordHash: string) {
    const [algorithm, salt, hash] = passwordHash.split('$');
    const digest = crypto.createHash(algorithm);
    const testHash = digest.update(salt + password, 'utf8').digest().toString('hex');
    return {
        correct: hash === testHash,
        needsUpdate: algorithm !== HASH_FUNCTION,
    };
}

export function hashPassword(password: string, algorithm: string = HASH_FUNCTION) {
    const digest = crypto.createHash(algorithm);
    const salt = crypto.randomBytes(8).toString('hex');
    const hash = digest.update(salt + password, 'utf8').digest().toString('hex');
    return [algorithm, salt, hash].join('$');
}
