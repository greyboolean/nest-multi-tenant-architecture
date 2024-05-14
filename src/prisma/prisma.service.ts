import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  private static idCounter = 0;
  public id: number;

  constructor(datasourceUrl: string) {
    super({ datasources: { db: { url: datasourceUrl } } });
    this.id = PrismaService.idCounter++;
  }
}
