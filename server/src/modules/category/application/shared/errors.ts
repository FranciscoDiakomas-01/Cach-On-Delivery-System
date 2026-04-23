import { HttpException, HttpStatus } from '@nestjs/common';

export default class CategoryNotFound extends HttpException {
  constructor(entitie: 'parent' | 'child') {
    super(
      {
        entitie,
        message: 'Categoria não encontrada',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class CategoryAlreadyxistError extends HttpException {
  constructor() {
    super(
      {
        message: 'Categoria já existe',
      },
      HttpStatus.CONFLICT,
    );
  }
}
