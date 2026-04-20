export interface IUseCase<Input, Output> {
  handle(data: Input): Promise<Output> | Output;
}

export interface IPagination<T> {
  items: T[];
  total: number;
  page: number | null;
  limit: number | null;
  hasNexPage: boolean | null;
  hasPrevPage: boolean | null;
  nextCursor?: string | null;
  prevCursor?: string | null;
}

export interface IPagintionProps {
  page: number;
  search?: string;
  limit: number;
}
