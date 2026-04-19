/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export interface IEmailService {
  send(payload: IEmailPayload): Promise<void>;
}

export interface IEmailPayload {
  to: string;
  subject: string;
  html: string;
  name?: string;
}

@Injectable()
export class EmailService implements IEmailService {
  private transporter: Transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = createTransport({
      host: this.config.get<string>('SMTP_HOST'),
      port: this.config.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.config.get<string>('SMTP_USER'),
        pass: this.config.get<string>('SMTP_PASS'),
      },
    });
  }

  async send(payload: IEmailPayload): Promise<void> {
    const { to, subject, html, name } = payload;

    await this.transporter.sendMail({
      from: `"${this.config.get('APP_NAME')}" <${this.config.get(
        'SMTP_FROM',
      )}>`,
      to: name ? `"${name}" <${to}>` : to,
      subject,
      html,
    });
  }
}
