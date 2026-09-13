import { BurgerHero } from '@/components/brasa-burger/BurgerHero';
import { PromoBanner } from '@/components/brasa-burger/PromoBanner';

export default function BrasaBurgerPage() {
  return (
    <main className="bg-burger-brown-dark">
      <BurgerHero />
      <PromoBanner />
    </main>
  );
}
