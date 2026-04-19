import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NODEMAILER_SERVICE } from 'src/core/constants';
import type { IEmailService } from 'src/infra/emails/interface';
import type { IForgotPayload, IRecoveryPayload } from './payloads';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AuthEventSubService {
  constructor(
    @Inject(NODEMAILER_SERVICE)
    private readonly emailService: IEmailService,
    private readonly config: ConfigService,
  ) {}
  @OnEvent('auth.forgot', { async: true })
  public async forgot(payload: IForgotPayload) {
    const { email, name, token } = payload;
    const resetLink = this.config.get<string>('RESET_LINK') + `?token=${token}`;
    await this.emailService.send({
      html: `<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Recuperação de Conta</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
      }

      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }

      .header {
        background-color: #0f172a;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
      }

      .content {
        padding: 30px;
        color: #333;
        line-height: 1.6;
      }

      .button {
        display: inline-block;
        margin: 20px 0;
        padding: 14px 24px;
        background-color: #2563eb;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }

      .footer {
        padding: 20px;
        font-size: 12px;
        color: #888;
        text-align: center;
      }

      .link {
        word-break: break-all;
        font-size: 12px;
        color: #2563eb;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        Recuperação de Conta
      </div>

      <div class="content">
        <p>Olá, <strong>${name}</strong>,</p>

        <p>
          Recebemos um pedido para redefinir a sua senha. Clique no botão abaixo para continuar:
        </p>

        <p style="text-align: center;">
          <a href="${resetLink}" class="button">
            Redefinir Senha
          </a>
        </p>

        <p>
          Se o botão não funcionar, copie e cole o link abaixo no seu navegador:
        </p>

        <p class="link">
         ${resetLink}
        </p>

        <p>
          ⚠️ Este link expira em alguns minutos. Se você não solicitou essa ação,
          ignore este email.
        </p>
      </div>

      <div class="footer">
        © ${new Date().getFullYear()} ${this.config.get<string>('APP_NAME')}. Todos os direitos reservados.
      </div>
    </div>
  </body>
</html>`,
      subject: 'Pedido de recuperação de conta',
      to: email,
      name: name,
    });
  }
  @OnEvent('auth.recovery', { async: true })
  public async recovery(payload: IRecoveryPayload) {
    const { email, name } = payload;
    const html = `
      <div style="font-family: Arial; background:#0a0a0f; color:#fff; padding:20px;">
        <h2>Senha alterada com sucesso</h2>

        <p>Olá ${name ?? 'utilizador'},</p>

        <p>A tua senha foi alterada com sucesso na tua conta.</p>

        <p style="margin-top:10px; font-size:12px; color:#9ca3af;">
          Se não foste tu, deves contactar o suporte imediatamente.
        </p>
        <div class="footer">
          © ${new Date().getFullYear()} ${this.config.get<string>('APP_NAME')}. Todos os direitos reservados.
        </div>
      </div>
    `;
    await this.emailService.send({
      to: email,
      subject: 'A tua senha foi alterada',
      html,
    });
  }
}
