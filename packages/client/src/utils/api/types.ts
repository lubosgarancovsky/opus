export type Page<T> = {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
};
