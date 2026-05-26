import Container from '@/components/ui/container/container';

const navItems = [
  { id: 'processing',   label: 'Order Processing' },
  { id: 'methods',      label: 'Shipping Methods' },
  { id: 'tracking',     label: 'Tracking Your Order' },
  { id: 'damages',      label: 'Damaged or Lost Items' },
  { id: 'restrictions', label: 'Shipping Restrictions' },
  { id: 'contact',      label: 'Contact Us' },
];

const highlights = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '1–2 Business Days',
    desc: 'Most in-stock orders are processed and dispatched within 1–2 business days.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: 'Nationwide Delivery',
    desc: 'We ship to all 50 US states. Most destinations receive orders within 3–7 business days.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: 'Full Tracking',
    desc: 'Every order ships with a tracking number so you always know exactly where your tires are.',
  },
];

const shippingMethods = [
  {
    method: 'Standard Ground',
    time: '5–7 Business Days',
    cost: 'Free on orders over $200',
    note: 'Available for all 48 contiguous states',
  },
  {
    method: 'Expedited Shipping',
    time: '2–3 Business Days',
    cost: 'Calculated at checkout',
    note: 'Available for most locations',
  },
  {
    method: 'Express / Overnight',
    time: '1 Business Day',
    cost: 'Calculated at checkout',
    note: 'Order must be placed before 12 PM EST',
  },
  {
    method: 'Alaska & Hawaii',
    time: '7–14 Business Days',
    cost: 'Additional freight charges apply',
    note: 'Contact us for a shipping quote',
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

const ShippingPolicyContent = () => {
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
                Shipping questions?
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
                At <span className="font-semibold text-foreground">WheelTireUSA</span>, we know
                you want your wheels and tires quickly and safely. That's why we work with
                trusted freight and parcel carriers experienced in handling heavy automotive
                products. Here's everything you need to know about how we ship.
              </p>
            </div>

            {/* Highlight stat cards */}
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

            {/* 01 – Order Processing */}
            <SectionCard id="processing" number="01" title="Order Processing">
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Orders are processed on business days (Monday–Friday, excluding federal
                  holidays). Most in-stock items are dispatched within{' '}
                  <span className="font-semibold text-foreground">1–2 business days</span> of
                  payment confirmation.
                </p>
                <div className="rounded-xl bg-secondary border border-border p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                  </svg>
                  <p>
                    Orders placed after <span className="font-semibold text-foreground">3 PM EST</span> or
                    on weekends and holidays will begin processing the next business day.
                    Special-order or out-of-stock items may require additional lead time — we'll
                    notify you by email if this applies.
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* 02 – Shipping Methods */}
            <SectionCard id="methods" number="02" title="Shipping Methods & Estimates">
              <p className="text-muted-foreground text-sm mb-5">
                We offer multiple shipping options to suit your timeline and budget. Delivery
                estimates begin from the date of dispatch, not the order date.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary border-b border-border">
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Method</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Estimate</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Cost</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingMethods.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-background' : 'bg-secondary/40'}`}
                      >
                        <td className="px-4 py-3 font-medium text-foreground">{row.method}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.time}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.cost}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground text-xs mt-3">
                * Shipping times are estimates and not guaranteed. Carrier delays may occur during
                peak seasons or adverse weather.
              </p>
            </SectionCard>

            {/* 03 – Tracking */}
            <SectionCard id="tracking" number="03" title="Tracking Your Order">
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Once your order ships, you'll receive a confirmation email containing your
                  tracking number and a link to the carrier's tracking page. You can also log
                  into your account on our site to view real-time shipment status.
                </p>
                <BulletList
                  items={[
                    'Tracking emails are sent within 24 hours of dispatch',
                    'Check your spam folder if you don\'t see the email',
                    'Tracking may take up to 24 hours to update after the label is created',
                    'Contact us if your tracking hasn\'t updated in 3+ business days',
                  ]}
                />
              </div>
            </SectionCard>

            {/* 04 – Damaged or Lost */}
            <SectionCard id="damages" number="04" title="Damaged or Lost Items">
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  We take great care in packaging your order. However, if your items arrive
                  damaged or go missing in transit, we're here to make it right.
                </p>
                <BulletList
                  items={[
                    'Inspect your delivery before signing — note any visible damage with the driver',
                    'Photograph damaged packaging and products immediately',
                    'Report damage or loss within 5 business days of the delivery date',
                    'Email photos and your order number to our support team',
                  ]}
                />
                <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p>
                    We file the carrier claim on your behalf and arrange a replacement or refund
                    at no extra cost to you.
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* 05 – Restrictions */}
            <SectionCard id="restrictions" number="05" title="Shipping Restrictions">
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Due to the size and weight of wheels and tires, certain limitations apply:
                </p>
                <BulletList
                  items={[
                    'We currently ship within the United States only (including AK and HI with surcharges)',
                    'P.O. Box delivery is not available — a physical street address is required',
                    'Some remote or rural ZIP codes may require freight delivery with additional lead time',
                    'International shipping is not available at this time',
                  ]}
                />
              </div>
            </SectionCard>

            {/* 06 – Contact */}
            <section
              id="contact"
              className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 scroll-mt-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-2">Still have questions?</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Our support team is available Monday–Friday, 9 AM–6 PM EST. We're happy to
                    help with shipping quotes, delivery estimates, or anything else.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    Get in touch
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </Container>
  );
};

export default ShippingPolicyContent;
