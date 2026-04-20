import { OnEvent } from '@nestjs/event-emitter';
import { Inject, Injectable } from '@nestjs/common';
import { NODEMAILER_SERVICE } from 'src/core/constants';
import type { IEmailService } from 'src/infra/emails/interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserEventsSubscriberService {
  constructor(
    @Inject(NODEMAILER_SERVICE)
    private readonly emailService: IEmailService,
    private readonly config: ConfigService,
  ) {}

  @OnEvent('new.deliveryman', { async: true })
  public async handleNewDeliveryman(payload: {
    userId: string;
    email: string;
    token: string;
    expiresAt: Date;
    name: string;
  }) {
    const { email, token, expiresAt, name } = payload;
    const baseUrl = this.config.get<string>('FRONT_URL');
    const firstAccessUrl = `${baseUrl}/forgot-password?token=${token}`;
    const html = `
      <div style="font-family: Arial, sans-serif; background:#0a0a0f; color:#fff; padding:20px;">
        
        <h2>Bem-vindo ao ${this.config.get<string>('APP_NAME')} 🚀</h2>

        <p>Olá ${name ?? 'utilizador'},</p>

        <p>
          A tua conta de <strong>delivery</strong> foi criada com sucesso.
        </p>

        <p>
          Para começares, precisas definir a tua senha:
        </p>

        <div style="margin: 20px 0;">
          <a 
            href="${firstAccessUrl}" 
            style="
              background:#2563eb;
              color:#fff;
              padding:12px 20px;
              text-decoration:none;
              border-radius:6px;
              display:inline-block;
            "
          >
            Definir senha
          </a>
        </div>

        <p style="font-size:13px; color:#9ca3af;">
          Este link expira em: <strong>${expiresAt.toLocaleString()}</strong>
        </p>

        <hr style="margin:20px 0; border-color:#1f2937;" />

        <p style="font-size:13px;">
          🔑 <strong>Problemas para aceder?</strong>
        </p>

        <p style="font-size:13px; color:#9ca3af;">
          Se perderes o acesso ou o link expirar, podes redefinir a tua senha aqui:
        </p>

        <div style="margin: 10px 0;">
          <a 
            href="${firstAccessUrl}" 
            style="
              color:#60a5fa;
              text-decoration:underline;
            "
          >
            Recuperar senha
          </a>
        </div>

        <p style="font-size:12px; color:#6b7280; margin-top:20px;">
          Se não foste tu, ignora este email ou contacta o suporte.
        </p>

        <hr style="margin:20px 0; border-color:#1f2937;" />

        <div style="font-size:12px; color:#6b7280;">
          © ${new Date().getFullYear()} ${this.config.get<string>('APP_NAME')}
        </div>
      </div>
    `;
    await this.emailService.send({
      to: email,
      subject: 'Ativa a tua conta e define a tua senha',
      html,
    });
  }
}
