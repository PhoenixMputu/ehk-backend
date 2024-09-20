import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { ValidationService } from '../speakeasy/validation.service';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly validationService: ValidationService,
    private readonly mailerService: MailerService,
  ) {}

  async existsUser(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async verifyUser(email: string) {
    return await this.existsUser(email);
  }

  async signup(signupDto: SignupDto) {
    const { firstName, lastName, sex, email, avatar, password, birthday, province, phoneNumber } = signupDto;

    const existingUser = await this.existsUser(email);
    if (existingUser) {
      throw new ConflictException("L'email est déjà associé à un compte");
    }

    const validationCode = this.validationService.generateValidationCode();
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prismaService.user.create({
      data: { avatar, firstName, lastName, sex, email, password: hashedPassword, birthday: new Date(birthday), province, phoneNumber },
    });
    
    await this.mailerService.sendSignupConfirmation(email, validationCode);
    return {
      user: {
        id: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
        sex: user.sex,
        avatar: user.avatar,
        birthday: user.birthday,
        email: user.email,
        province: user.province,
        phoneNumber: user.phoneNumber
      },
      access_token: this.generateToken(user)
    }
  }

  async resendValidationCode(email: string) {
    const user = await this.existsUser(email);
    if (!user) {
      throw new NotFoundException("Utilisateur non trouvé");
    }

    const validationCode = this.validationService.generateValidationCode();
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);

    await this.mailerService.sendSignupConfirmation(email, validationCode);
  }

  async signin(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
