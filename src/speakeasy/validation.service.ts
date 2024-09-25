import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';

@Injectable()
export class ValidationService {
  generateValidationCode(): string {
    return speakeasy.totp({
      secret: process.env.SECRET_KEY!,
      digits: 4,
      step: 3600,
      encoding: 'base32',
    });
  }

  verifyValidationCode(token: string): boolean {
    return speakeasy.totp.verify({
      secret: process.env.SECRET_KEY!,
      encoding: 'base32',
      step: 3600,
      token,
      window: 1,
    });
  }
}
