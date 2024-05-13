import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AggregateByTenantContextIdStrategy } from './prisma/aggregate-by-tenant-context-id.strategy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());
  await app.listen(3000);
}
bootstrap();
