import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

dotenv.config();

const tenants = process.env.TENANTS.split(',');

for (const tenant of tenants) {
  const databaseUrl = process.env.DATABASE_URL.replace('public', tenant);
  execSync(`npx prisma migrate dev`, {
    env: { ...process.env, DATABASE_URL: databaseUrl },
    stdio: 'inherit',
  });
}
