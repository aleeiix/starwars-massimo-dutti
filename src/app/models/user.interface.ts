import { RoleEnum } from './role.enum';

export interface User {
  role: RoleEnum;
  name: string;
  lastname: string;
  email: string;
}
