import { HttpException, HttpStatus } from '@nestjs/common';

export enum ProductErrorCode {
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  INVALID_PRICE = 'INVALID_PRICE',
  PRODUCT_ALREADY_EXISTS = 'PRODUCT_ALREADY_EXISTS',
  INSUFFICIENT_STOCK = 'INSUFFICIENT_STOCK',
}

export class ProductNotFoundException extends HttpException {
  constructor(productId: string) {
    super(
      {
        message: `Produto com ID ${productId} não encontrado`,
        error: ProductErrorCode.PRODUCT_NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class ProductOutOfStockException extends HttpException {
  constructor(productName: string) {
    super(
      {
        message: `Produto "${productName}" está sem estoque`,
        error: ProductErrorCode.OUT_OF_STOCK,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class InvalidProductPriceException extends HttpException {
  constructor() {
    super(
      {
        message: 'O preço do produto deve ser maior que zero',
        error: ProductErrorCode.INVALID_PRICE,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class ProductAlreadyExistsException extends HttpException {
  constructor(name: string) {
    super(
      {
        message: `Produto "${name}" já existe`,
        error: ProductErrorCode.PRODUCT_ALREADY_EXISTS,
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class InsufficientStockException extends HttpException {
  constructor(requested: number, available: number) {
    super(
      {
        message: `Solicitado ${requested}, mas apenas ${available} disponível`,
        error: ProductErrorCode.INSUFFICIENT_STOCK,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class ProductInactiveException extends HttpException {
  constructor() {
    super(
      {
        message: `O produto esta inativo`,
        error: ProductErrorCode.INSUFFICIENT_STOCK,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
