export interface ICacheClient {
  set(key: string, value: any, ttlSeconds?: number): Promise<'OK'>;
  get<T = any>(key: string): Promise<T | null>;
  delete(key: string): Promise<'OK'>;
}
