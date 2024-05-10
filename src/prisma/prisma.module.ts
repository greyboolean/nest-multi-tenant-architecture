import { Module, Scope } from '@nestjs/common';
import { PrismaClientManager } from './prisma-client-manager';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Module({
  providers: [
    PrismaClientManager,
    {
      provide: 'PrismaService',
      scope: Scope.REQUEST,
      inject: [REQUEST, PrismaClientManager],
      useFactory: (
        request: Request,
        prismaClientManager: PrismaClientManager,
      ) => {
        const prismaClient = prismaClientManager.getPrismaClient(request);
        return prismaClient;
      },
    },
  ],
  exports: ['PrismaService'],
})
export class PrismaModule {}
