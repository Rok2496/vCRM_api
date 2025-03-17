export type IQuery<T> = {
  data: T[];
  pagination?: {
    total: number;
    limit: number;
    skip: number;
  };
};
