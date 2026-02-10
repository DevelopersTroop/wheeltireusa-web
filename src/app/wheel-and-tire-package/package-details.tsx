import { TInventoryItem } from "@/types/product";
import { getPrice } from "@/utils/price";
import Link from "next/link";
import { useMemo } from "react";
import {
  DollarSign,
  Truck,
  ShoppingCart,
  CreditCard,
  Phone,
  CheckCircle,
} from "lucide-react";

// Format currency
const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

const PackageDetails = ({
  wheel,
  tire,
}: {
  wheel: TInventoryItem;
  tire: TInventoryItem;
}) => {
  const wheelPrice = getPrice(wheel);
  const tirePrice = getPrice(tire);

  const totalPrice = useMemo(() => {
    return wheelPrice + tirePrice;
  }, [wheelPrice, tirePrice]);

  const packagePrice = totalPrice * 4 - 10;

  const deliveryDates = useMemo(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 3);
    const end = new Date(today);
    end.setDate(today.getDate() + 7);

    const format = (date: Date) =>
      date.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
      });

    return `${format(start)} - ${format(end)}`;
  }, []);

  return (
    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      {/* Pricing Header */}
      <div className="bg-gradient-to-br from-foreground via-foreground/95 to-foreground p-6 text-card">
        <div className="flex items-start justify-between mb-4">
          <p className="text-xs uppercase tracking-wider text-card/50 font-medium">
            Package Price
          </p>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-full">
            SAVE $10
          </span>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-extrabold tracking-tight">
            {formatPrice(packagePrice)}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-card/40 line-through">
            {formatPrice(totalPrice * 4)}
          </span>
          <span className="text-xs text-card/60">original retail</span>
        </div>

        {/* Per-item breakdown */}
        <div className="mt-4 pt-4 border-t border-card/10 grid grid-cols-2 gap-3">
          <div className="bg-card/5 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-wider text-card/40 font-medium">
              Wheels × 4
            </p>
            <p className="text-lg font-bold mt-0.5">
              {formatPrice(wheelPrice * 4)}
            </p>
          </div>
          <div className="bg-card/5 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-wider text-card/40 font-medium">
              Tires × 4
            </p>
            <p className="text-lg font-bold mt-0.5">
              {formatPrice(tirePrice * 4)}
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="p-5 space-y-3.5">
        <PerkRow
          icon={<DollarSign size={16} />}
          iconBg="bg-green-50 text-green-600"
        >
          <p className="text-sm text-foreground">
            Save <span className="font-bold">$10</span> when adding tires to
            package
          </p>
        </PerkRow>

        <PerkRow
          icon={<CheckCircle size={16} />}
          iconBg="bg-blue-50 text-blue-600"
        >
          <p className="text-sm text-foreground">
            Free Mount & Balance included
          </p>
        </PerkRow>

        <PerkRow
          icon={<Truck size={16} />}
          iconBg="bg-purple-50 text-purple-600"
        >
          <div className="text-sm text-foreground">
            <p>Free Quick Delivery</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              As Fast As{" "}
              <span className="font-semibold text-foreground">
                {deliveryDates}
              </span>{" "}
              to the lower 48
            </p>
          </div>
        </PerkRow>

        <PerkRow
          icon={<ShoppingCart size={16} />}
          iconBg="bg-emerald-50 text-emerald-600"
        >
          <p className="text-sm text-foreground font-medium">
            In Stock & Ready to Ship
          </p>
        </PerkRow>

        <div className="border-t border-border/50 pt-3.5">
          <PerkRow
            icon={<CreditCard size={16} />}
            iconBg="bg-amber-50 text-amber-600"
          >
            <div className="text-sm text-foreground">
              <p>Starting at $79/mo or 0% APR</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                with{" "}
                <span className="font-bold text-foreground">affirm</span>{" "}
                <Link
                  href="#"
                  className="text-primary text-xs hover:underline"
                >
                  Check your purchasing power
                </Link>
              </p>
            </div>
          </PerkRow>
        </div>

        <div className="border-t border-border/50 pt-3.5">
          <PerkRow
            icon={<CreditCard size={16} />}
            iconBg="bg-blue-50 text-blue-600"
          >
            <div className="text-sm text-foreground">
              <p>6 payments at 0% APR</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                with{" "}
                <img
                  src="/paypal.svg"
                  alt="PayPal"
                  className="inline-block h-4 align-middle"
                />{" "}
                <Link
                  href="#"
                  className="text-primary text-xs hover:underline"
                >
                  Learn More
                </Link>
              </p>
            </div>
          </PerkRow>
        </div>

        {/* Phone Support */}
        <div className="border-t border-border/50 pt-3.5">
          <PerkRow
            icon={<Phone size={16} />}
            iconBg="bg-primary/10 text-primary"
          >
            <div className="text-sm">
              <p className="text-muted-foreground">Need help? Call our experts</p>
              <p className="font-bold text-primary">+1 (303) 695-6305</p>
            </div>
          </PerkRow>
        </div>
      </div>
    </div>
  );
};

// Perk row component
function PerkRow({
  icon,
  iconBg,
  children,
}: {
  icon: React.ReactNode;
  iconBg: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export default PackageDetails;
