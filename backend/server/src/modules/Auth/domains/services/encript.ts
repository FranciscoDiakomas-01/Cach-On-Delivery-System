import bcrypt from 'bcrypt';

export default class PasswordHasher {
  private static readonly SALT_ROUNDS = 10;

  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  static async compare(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}
