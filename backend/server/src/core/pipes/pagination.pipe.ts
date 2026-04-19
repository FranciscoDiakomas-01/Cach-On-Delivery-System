/* eslint-disable prefer-const */
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { IPagintionProps } from 'src/core/types';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: IPagintionProps): IPagintionProps {
    let { page, limit, search } = value;

    page = Number(page);
    limit = Number(limit);

    if (!page || page < 1) page = 1;
    if (!limit || limit < 1) limit = 10;

    if (limit > 100) {
      throw new BadRequestException('Limit máximo é 100');
    }

    if (search && typeof search !== 'string') {
      throw new BadRequestException('Search deve ser string');
    }

    return {
      page,
      limit,
      search,
    };
  }
}
