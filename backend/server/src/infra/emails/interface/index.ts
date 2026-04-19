export interface IEmailService {
  send(payload: IEmailPayload): Promise<void>;
}

export interface IEmailPayload {
  to: string;
  subject: string;
  html: string;
  name?: string;
}
