import { Module, Scope } from '@nestjs/common';
import { PrismaClientManager } from './prisma-client-manager';
import { REQUEST } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';

export interface ContextPayload {
  tenantId: string;
}

@Module({
  providers: [
    PrismaClientManager,
    {
      provide: PrismaClient,
      scope: Scope.REQUEST,
      durable: true,
      inject: [REQUEST, PrismaClientManager],
      useFactory: (
        ctxPayload: ContextPayload,
        prismaClientManager: PrismaClientManager,
      ) => {
        const prismaClient = prismaClientManager.getPrismaClient(
          ctxPayload.tenantId,
        );
        return prismaClient;
      },
    },
  ],
  exports: [PrismaClient],
})
export class PrismaModule {}
