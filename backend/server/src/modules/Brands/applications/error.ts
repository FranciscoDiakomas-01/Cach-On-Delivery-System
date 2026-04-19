import { HttpException, HttpStatus } from '@nestjs/common';

export class BrandNotFoundError extends HttpException {
  constructor(idOrSlug: string) {
    super(`Brand "${idOrSlug}" não encontrada`, HttpStatus.NOT_FOUND);
    this.name = 'BrandNotFoundError';
  }
}

export class BrandAlreadyExistsError extends HttpException {
  constructor(title: string) {
    super(`Brand "${title}" já existe`, HttpStatus.CONFLICT);
    this.name = 'BrandAlreadyExistsError';
  }
}
