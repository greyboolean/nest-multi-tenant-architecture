import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(datasourceUrl: string) {
    super({ datasources: { db: { url: datasourceUrl } } });
  }
}
