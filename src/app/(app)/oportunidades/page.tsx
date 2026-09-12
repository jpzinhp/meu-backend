import { store } from '@/lib/data';
import { OpportunitiesBoard } from '@/components/crm/OpportunitiesBoard';

export const dynamic = 'force-dynamic';

export default async function OportunidadesPage() {
  const opportunities = await store.listOpportunities();
  return <OpportunitiesBoard initialOpportunities={opportunities} />;
}
