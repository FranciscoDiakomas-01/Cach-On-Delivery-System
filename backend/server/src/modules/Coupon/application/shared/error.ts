import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

export class NotFoundCoupunError extends NotFoundException {
  constructor() {
    super({
      message: 'Coupun não encontrado',
    });
  }
}

export class InactiveCounpunError extends BadRequestException {
  constructor() {
    super({
      message: 'Coupun deve estar inativo ou atingiu o limite de uso',
    });
  }
}

export class CoupunAlreadyExistError extends ConflictException {
  constructor() {
    super({
      message: 'Coupun já existe ',
    });
  }
}
