import Container from '@/components/ui/container/container';

const navItems = [
  { id: 'acceptance',  label: 'Order Acceptance' },
  { id: 'pricing',     label: 'Pricing' },
  { id: 'payment',     label: 'Payment' },
  { id: 'shipping',    label: 'Shipping & Risk of Loss' },
  { id: 'returns',     label: 'Returns & Refunds' },
  { id: 'warranty',    label: 'Warranty Disclaimer' },
  { id: 'liability',   label: 'Limitation of Liability' },
  { id: 'dispute',     label: 'Dispute Resolution' },
];

const highlights = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '30-Day Returns',
    desc: 'Unused, unmounted items may be returned within 30 days of delivery with RA approval.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Secure Payments',
    desc: 'We accept major credit cards and approved financing providers listed at checkout.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: 'Binding Arbitration',
    desc: 'Disputes are resolved through individual binding arbitration — no class actions or jury trials.',
  },
];

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 mt-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

const SectionCard = ({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className="rounded-2xl border border-border bg-background p-6 sm:p-8 scroll-mt-8"
  >
    <div className="flex items-start gap-4 mb-5">
      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
        {number}
      </span>
      <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-snug pt-1.5">
        {title}
      </h2>
    </div>
    <div className="h-px bg-border mb-5" />
    {children}
  </section>
);

export const TermsAndConditionsOfSaleContent = () => {
  return (
    <Container>
      <div className="px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* ── Sticky sidebar ───────────────────────────────────────────── */}
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              Contents
            </p>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary flex-shrink-0 transition-colors" />
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 rounded-xl bg-secondary border border-border p-4">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                Last Updated
              </p>
              <p className="text-sm font-semibold text-foreground">May 2025</p>
            </div>

            <div className="mt-4 rounded-xl bg-primary/5 border border-primary/20 p-4">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                Questions?
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Contact us
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </aside>

          {/* ── Main content ─────────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Intro */}
            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
              <p className="text-muted-foreground leading-relaxed">
                These Terms and Conditions of Sale govern all purchases made through{' '}
                <span className="font-semibold text-foreground">WheelTireUSA</span>. By placing
                an order, you agree to be bound by the terms below. Please read them carefully
                before completing your purchase.
              </p>
            </div>

            {/* Highlight cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-2xl border border-border bg-background p-5 flex flex-col gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {h.icon}
                  </div>
                  <h3 className="font-bold text-foreground text-sm">{h.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>

            {/* 01 – Order Acceptance */}
            <SectionCard id="acceptance" number="01" title="Order Acceptance">
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>These Terms govern all purchases made through WheelTireUSA.</p>
                <p>Your order constitutes an offer to purchase. We may refuse or cancel orders due to:</p>
                <BulletList items={[
                  'Pricing errors',
                  'Product availability',
                  'Suspected fraud',
                  'Incorrect vehicle information',
                ]} />
                <div className="rounded-xl bg-secondary border border-border p-4 flex items-start gap-3 mt-2">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                  </svg>
                  <p>Orders are considered accepted only upon shipment of the product.</p>
                </div>
              </div>
            </SectionCard>

            {/* 02 – Pricing */}
            <SectionCard id="pricing" number="02" title="Pricing">
              <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                <BulletList items={[
                  'Prices are subject to change without notice.',
                  'Taxes and shipping charges are calculated at checkout.',
                  'We reserve the right to correct pricing errors at any time.',
                ]} />
              </div>
            </SectionCard>

            {/* 03 – Payment */}
            <SectionCard id="payment" number="03" title="Payment">
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  We accept major credit cards and approved financing or payment providers
                  listed at checkout.
                </p>
                <div className="rounded-xl bg-secondary border border-border p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p>
                    You represent and warrant that you are fully authorized to use the payment
                    method submitted at checkout.
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* 04 – Shipping & Risk of Loss */}
            <SectionCard id="shipping" number="04" title="Shipping & Risk of Loss">
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Title and risk of loss transfer to you at the moment the product is delivered
                  to the carrier. From that point forward, the shipment is the buyer's
                  responsibility.
                </p>
                <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                  </svg>
                  <p>
                    Delivery dates provided at checkout are estimates only and are not
                    guaranteed. Carrier delays are outside our control.
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* 05 – Returns & Refunds */}
            <SectionCard id="returns" number="05" title="Returns & Refunds">
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <BulletList items={[
                  'Returns must be requested within 30 days of delivery.',
                  'Products must be new, unused, and in original packaging.',
                  'Mounted, installed, or driven-on products are non-returnable.',
                  'Custom-built or made-to-order wheels are non-cancellable and non-returnable.',
                  'Clearance items are final sale and cannot be returned.',
                ]} />
                <div className="grid sm:grid-cols-2 gap-3 mt-2">
                  <div className="rounded-xl bg-secondary border border-border p-4 flex items-start gap-3">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-xs leading-relaxed">
                      <span className="font-semibold text-foreground block mb-0.5">RA Required</span>
                      Return Authorization approval is required before sending any item back.
                    </p>
                  </div>
                  <div className="rounded-xl bg-secondary border border-border p-4 flex items-start gap-3">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs leading-relaxed">
                      <span className="font-semibold text-foreground block mb-0.5">Restocking Fees</span>
                      Restocking fees may apply depending on the brand and product type.
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 06 – Warranty Disclaimer */}
            <SectionCard id="warranty" number="06" title="Warranty Disclaimer">
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>Products are covered by manufacturer warranties only.</p>
                <div className="rounded-xl bg-secondary border border-border p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p>
                    WheelTireUSA provides no independent warranties and sells products{' '}
                    <span className="font-semibold text-foreground">"AS IS"</span> except where
                    prohibited by applicable law.
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* 07 – Limitation of Liability */}
            <SectionCard id="liability" number="07" title="Limitation of Liability">
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Our total liability shall not exceed the amount paid for the specific product
                  in dispute.
                </p>
                <p>
                  WheelTireUSA is not liable for indirect, incidental, special, or consequential
                  damages arising from your use of our products or website.
                </p>
              </div>
            </SectionCard>

            {/* 08 – Dispute Resolution */}
            <SectionCard id="dispute" number="08" title="Dispute Resolution">
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  All disputes arising from or relating to these Terms shall be resolved through
                  binding arbitration on an individual basis.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mt-2">
                  <div className="rounded-xl bg-secondary border border-border p-4 text-center">
                    <div className="text-2xl mb-2">🚫</div>
                    <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-1">
                      No Class Actions
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Class action lawsuits are expressly waived.
                    </p>
                  </div>
                  <div className="rounded-xl bg-secondary border border-border p-4 text-center">
                    <div className="text-2xl mb-2">⚖️</div>
                    <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-1">
                      No Jury Trials
                    </p>
                    <p className="text-xs text-muted-foreground">
                      The right to a jury trial is expressly waived.
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Footer note */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex items-start gap-4">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              </svg>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Have questions about these Terms and Conditions?{' '}
                <a href="/contact" className="text-primary font-semibold hover:underline">
                  Contact us
                </a>{' '}
                and our team will be happy to help.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Container>
  );
};
