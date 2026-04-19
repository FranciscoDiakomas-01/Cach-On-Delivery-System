import { Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';

@Injectable()
export default class RecoveryTokenService {
  generate() {
    const raw = randomBytes(32).toString('hex');
    const hash = createHash('sha256').update(raw).digest('hex');
    return { raw, hash };
  }
  validate(rawToken: string, storedHash: string): boolean {
    const hash = createHash('sha256').update(rawToken).digest('hex');

    return hash === storedHash;
  }
  decifer(raw: string) {
    return createHash('sha256').update(raw).digest('hex');
  }
}
