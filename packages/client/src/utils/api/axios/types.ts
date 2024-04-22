type Resolved<T> = {
  resolved: true;
  data: T;
};

type Rejected = {
  resolved: false;
  error: any;
};

export type Result<T> = {
  status: number;
} & (Resolved<T> | Rejected);
