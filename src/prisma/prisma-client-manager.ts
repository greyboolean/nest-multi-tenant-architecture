import {
  BadRequestException,
  Injectable,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class PrismaClientManager implements OnModuleDestroy {
  // the client instances cache object
  private prismaClients: { [key: string]: PrismaClient } = {};

  getTenantId(request: Request): string {
    // retrieve and return the tenant ID from the request object
    const tenantId = request.headers['x-tenant-id'] as string;

    // throw an exception if the ID is not valid
    if (!tenantId) {
      throw new BadRequestException('Tenant ID is invalid.');
    }

    return tenantId;
  }

  getPrismaClient(request: Request): PrismaClient {
    const tenantId = this.getTenantId(request);
    let prismaClient = this.prismaClients[tenantId];

    // create and cache a new client when needed
    if (!prismaClient) {
      const databaseUrl = process.env.DATABASE_URL!.replace('public', tenantId);
      console.log(databaseUrl);

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
