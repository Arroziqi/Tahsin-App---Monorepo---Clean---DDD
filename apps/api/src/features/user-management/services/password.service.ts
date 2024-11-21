import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly logger = new Logger(PasswordService.name);

  async hashedPassword(password: string): Promise<string> {
    this.logger.debug('Hashing password');
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      this.logger.debug('Password hashed successfully');
      return hashedPassword;
    } catch (error) {
      this.logger.error('Failed to hash password');
      throw error;
    }
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    this.logger.debug('Comparing passwords');
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      this.logger.debug(`Password comparison result: ${isMatch}`);
      return isMatch;
    } catch (error) {
      this.logger.error('Failed to compare passwords');
      throw error;
    }
  }
}
