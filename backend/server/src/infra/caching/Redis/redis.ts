import { Injectable } from '@nestjs/common';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';
import { ICacheClient } from '../type';

@Injectable()
export class RedisService implements ICacheClient {
  private readonly client: Keyv;
  constructor() {
    const url = process.env.REDIS_URL;
    if (!url) {
      throw new Error('REDIS_URL não definida');
    }
    this.client = new Keyv({
      store: new KeyvRedis(url),
    });
  }

  async set(key: string, value: any, ttlSeconds?: number): Promise<'OK'> {
    await this.client.set(
      key,
      value,
      ttlSeconds ? ttlSeconds * 1000 : undefined,
    );
    return 'OK';
  }

  async get<T = any>(key: string): Promise<T | null> {
    return (await this.client.get(key)) as T | null;
  }

  async delete(key: string): Promise<'OK'> {
    await this.client.delete(key);
    return 'OK';
  }
}
