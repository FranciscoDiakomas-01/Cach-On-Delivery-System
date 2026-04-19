import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'crypto';

@Injectable()
export default class RecoveryTokenService {
  generate() {
    const raw = randomBytes(32).toString('hex');

    const hash = createHash('sha256').update(raw).digest('hex');

    return {
      raw,
      hash,
    };
  }
}
