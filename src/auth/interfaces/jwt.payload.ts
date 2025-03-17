export interface JwtPayload {
  readonly id: number;
  readonly email: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly is_super_admin: boolean;
  readonly roles: string[];
  readonly permissions: string[];
}
