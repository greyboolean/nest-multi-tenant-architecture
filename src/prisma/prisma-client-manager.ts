import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaClientManager implements OnModuleDestroy {
  // the client instances cache object
  private prismaClients: { [key: string]: PrismaClient } = {};

  getPrismaClient(tenantId: string): PrismaClient {
    let prismaClient = this.prismaClients[tenantId];

    // create and cache a new client when needed
    if (!prismaClient) {
      const databaseUrl = process.env.DATABASE_URL!.replace('public', tenantId);

      prismaClient = new PrismaClient({
        datasources: {
          db: {
            url: databaseUrl,
          },
        },
      });

      this.prismaClients[tenantId] = prismaClient;
    }

    return prismaClient;
  }

  async onModuleDestroy() {
    // wait for every cached instance to be disposed
    await Promise.all(
      Object.values(this.prismaClients).map((client) => client.$disconnect()),
    );
  }
}
