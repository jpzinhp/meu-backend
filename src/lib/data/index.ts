import { fileStore } from './file-store';
import type { DataStore } from './db';

// Ponto único de troca de backend de dados. Quando `DATABASE_URL` (ou
// `SUPABASE_URL`) estiver configurado, plugue aqui a implementação real de
// `DataStore` (ex: `new SupabasePostgresStore()`). Até lá, usamos o
// armazenamento local em arquivo — funcional para demonstração e
// desenvolvimento, mas não para múltiplas instâncias em produção.
export const store: DataStore = fileStore;

export const isProductionDatabaseConfigured = Boolean(
  process.env.DATABASE_URL || process.env.SUPABASE_URL,
);
