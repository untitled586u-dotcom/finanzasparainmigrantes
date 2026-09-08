import { Car, CreditCard, HandCoins, Landmark, Receipt, type LucideProps } from "lucide-react";

const map: Record<string, React.ComponentType<LucideProps>> = {
  car: Car,
  "credit-card": CreditCard,
  "hand-coins": HandCoins,
  landmark: Landmark,
  receipt: Receipt,
};

export function CategoryIcon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name] ?? Landmark;
  return <Cmp {...props} />;
}
