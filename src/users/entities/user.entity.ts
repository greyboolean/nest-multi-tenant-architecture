import { User as UserModel } from '@prisma/client';

export class User implements UserModel {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  id: number;

  email: string;

  name: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  tenantId: string;
}
