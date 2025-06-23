import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_NG1xtKrvOp7A@ep-aged-smoke-a8a17624-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  },
});