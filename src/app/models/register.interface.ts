import { RoleEnum } from './role.enum';

export interface Register {
  role: RoleEnum;
  name: string;
  lastname: string;
  email: string;
  password: string;
}
