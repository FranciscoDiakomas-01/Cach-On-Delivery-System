export interface IForgotPayload {
  userId: string;
  email: string;
  token: string;
  expiresAt: Date;
  name: string;
}

export interface IRecoveryPayload {
  userId: string;
  email: string;
  name: string;
}
