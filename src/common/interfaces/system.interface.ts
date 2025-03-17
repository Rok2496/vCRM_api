export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type ItemOrItems<T> = T | T[];

export type IUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_super_admin: boolean;
};
