import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  private async transporter() {
    return nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: this.configService.get('MAILER_PORT')!,
      ignoreTLS: true,
      auth: {
        user: this.configService.get('MAILER_USER')!,
        pass: this.configService.get('MAILER_PASSWORD')!,
      },
    });
  }

  private async renderTemplate(templateName: string, variables: object) {
    const filePath = path.join(__dirname, `../templates/${templateName}.hbs`);
    const source = fs.readFileSync(filePath, 'utf8');
    const template = handlebars.compile(source);
    return template(variables);
  }

  async sendSignupConfirmation(email: string, code: string) {
    const html = await this.renderTemplate('signup-confirmation', { email, code });

    (await this.transporter()).sendMail({
      from: '"No Reply" <app@localhost.com>',
      to: email,
      subject: "Validation d'inscription",
      html,
    });
  }

  async sendLinkNewPassword(email: string, url: string) {
    const html = await this.renderTemplate('password-reset', { email, url });

    (await this.transporter()).sendMail({
      from: '"No Reply" <app@localhost.com>',
      to: email,
      subject: 'Réinitialisation de mot de passe',
      html,
    });
  }
}
