import { HttpException, HttpStatus } from '@nestjs/common';

// 401 - Credenciais inválidas
export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
  }
}

// 404 - Utilizador não encontrado
export class UserNotFoundException extends HttpException {
  constructor() {
    super('Utilizador não encontrado', HttpStatus.NOT_FOUND);
  }
}

// 403 - Conta inativa
export class UserInactiveException extends HttpException {
  constructor() {
    super('Conta inativa', HttpStatus.FORBIDDEN);
  }
}

// 409 - Email já em uso
export class EmailAlreadyInUseException extends HttpException {
  constructor() {
    super('Este e-mail já está em uso', HttpStatus.CONFLICT);
  }
}

// 401 - Token inválido
export class InvalidTokenException extends HttpException {
  constructor() {
    super('Token inválido ou expirado', HttpStatus.UNAUTHORIZED);
  }
}

// 401 - Token expirado
export class TokenExpiredException extends HttpException {
  constructor() {
    super('Token expirado', HttpStatus.UNAUTHORIZED);
  }
}

// 403 - Acesso negado (roles/permissões)
export class AccessDeniedException extends HttpException {
  constructor() {
    super('Acesso negado', HttpStatus.FORBIDDEN);
  }
}

// 403 - Conta não verificada
export class AccountNotVerifiedException extends HttpException {
  constructor() {
    super('Conta não verificada', HttpStatus.FORBIDDEN);
  }
}

// 400 - Dados inválidos genéricos (fallback)
export class InvalidDataException extends HttpException {
  constructor() {
    super('Dados inválidos', HttpStatus.BAD_REQUEST);
  }
}
