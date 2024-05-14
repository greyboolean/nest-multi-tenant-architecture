import { Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from './prisma.service';

export interface ContextPayload {
  tenantId: string;
}

@Module({
  providers: [
    {
      provide: PrismaService,
      scope: Scope.REQUEST,
      durable: true,
      inject: [REQUEST],
      useFactory: (ctxPayload: ContextPayload) => {
        const datasourceUrl = process.env.DATABASE_URL!.replace(
          'public',
          ctxPayload.tenantId,
        );
        return new PrismaService(datasourceUrl);
      },
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
