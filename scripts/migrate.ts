import { execSync } from 'child_process';

const tenants = ['tenant1', 'tenant2', 'tenant3']; // replace with your actual tenants

for (const tenant of tenants) {
  process.env.DATABASE_URL = `postgresql://user:password@localhost:5432/nest-multi-tenant?schema=${tenant}`;
  execSync('npx prisma migrate dev', { stdio: 'inherit' });
}
