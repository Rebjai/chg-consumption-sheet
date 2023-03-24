import UserRole from 'src/users/enums/user-role.enum';
export type JwtPayload = {
    email: string;
    sub: number;
    role: UserRole
  };