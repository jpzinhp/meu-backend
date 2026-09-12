import { Nav } from '@/components/Nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="min-h-[calc(100vh-57px)] bg-slate-50">{children}</main>
    </>
  );
}
