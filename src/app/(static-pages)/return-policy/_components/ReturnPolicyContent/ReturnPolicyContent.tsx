import Container from '@/components/ui/container/container';

const steps = [
  {
    number: '01',
    title: 'Contact Us',
    desc: 'Reach our customer support by phone, email, or live chat. Share your order number and reason for return — we\'ll guide you through the next steps.',
  },
  {
    number: '02',
    title: 'Receive Return Instructions',
    desc: 'We\'ll provide a prepaid return label or arrange a pickup. Return shipping is on us for our errors or warranty issues. Personal returns may have a small fee — always communicated up front.',
  },
  {
    number: '03',
    title: 'Pack & Ship',
    desc: 'Place tires in their original packaging, attach the label, and drop off or schedule pickup. We work with carriers who handle heavy items safely.',
  },
  {
    number: '04',
    title: 'Refund or Exchange',
    desc: 'Once received and inspected, refunds post to your original payment method within 7–10 business days. Exchanges ship out promptly so you\'re not waiting long.',
  },
];

const highlights = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '30-Day Returns',
    desc: 'Return unused, unmounted tires within 30 days of delivery for a full refund or exchange — no questions asked.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'No-Hassle Promise',
    desc: 'Outside the standard window? Already mounted and found a defect? Contact us anyway — we\'ll find a fair solution.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
      </svg>
    ),
    title: 'Fitment Guarantee',
    desc: 'Bought tires through our vehicle search and they don\'t fit? We\'ll exchange or fully refund — including shipping inconvenience.',
  },
];

const navItems = [
  { id: 'guarantee', label: '30-Day Guarantee' },
  { id: 'process', label: 'Return Process' },
  { id: 'no-hassle', label: 'No-Hassle Promise' },
  { id: 'bottom-line', label: 'Bottom Line' },
];

const ReturnPolicyContent = () => {
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
              <p className="text-sm font-semibold text-foreground">June 3, 2025</p>
            </div>

            <div className="mt-4 rounded-xl bg-primary/5 border border-primary/20 p-4">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Need help?</p>
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

            {/* Intro card */}
            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
              <p className="text-muted-foreground leading-relaxed">
                At <span className="font-semibold text-foreground">WheelTireUSA</span>, we want
                you to love your new wheels & tires. Our Return Policy is designed to be customer-friendly
                and hassle-free, reflecting our commitment to your satisfaction, safety, and
                convenience.
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

            {/* 30-Day Guarantee */}
            <section
              id="guarantee"
              className="rounded-2xl border border-border bg-background p-6 sm:p-8 scroll-mt-8"
            >
              <div className="flex items-start gap-4 mb-5">
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  01
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-snug pt-1.5">
                  30-Day Satisfaction Guarantee
                </h2>
              </div>
              <div className="h-px bg-border mb-5" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  If you're not 100% satisfied with your purchase, you have{' '}
                  <span className="font-semibold text-foreground">30 days</span> from the delivery
                  date to return unused tires for a full refund or exchange.
                </p>
                <div className="rounded-xl bg-secondary border border-border p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                  </svg>
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">Key condition:</span> Tires must
                    be unused and unmounted. Once a tire has been driven on or mounted, it is no
                    longer eligible for a routine return.
                  </p>
                </div>
              </div>
            </section>

            {/* Return Process */}
            <section
              id="process"
              className="rounded-2xl border border-border bg-background p-6 sm:p-8 scroll-mt-8"
            >
              <div className="flex items-start gap-4 mb-5">
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  02
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-snug pt-1.5">
                  Easy Return Process
                </h2>
              </div>
              <div className="h-px bg-border mb-6" />
              <p className="text-muted-foreground mb-6">
                We've made the process as simple as possible — four steps and you're done.
              </p>
              <div className="flex flex-col gap-4">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {step.number}
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px h-full min-h-[2rem] bg-border mt-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
                Throughout the process, our support team will keep you updated — you'll never be
                left wondering what's happening with your return.
              </p>
            </section>

            {/* No-Hassle Promise */}
            <section
              id="no-hassle"
              className="rounded-2xl border border-border bg-background p-6 sm:p-8 scroll-mt-8"
            >
              <div className="flex items-start gap-4 mb-5">
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  03
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-snug pt-1.5">
                  No-Hassle Promise
                </h2>
              </div>
              <div className="h-px bg-border mb-5" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Is it past 30 days? Did you already mount the tires and discover an issue? Don't
                  panic — contact us anyway. We take a case-by-case approach and will work with you
                  to find a fair solution, whether that's a warranty claim, a pro-rated refund, or
                  another resolution.
                </p>
                <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">Fitment Guarantee:</span> If
                    you used our vehicle search or Tire Size Calculator and the recommended tires
                    don't fit, you're fully covered — exchange or full refund, including any
                    shipping or installation inconvenience.
                  </p>
                </div>
              </div>
            </section>

            {/* Bottom line */}
            <section
              id="bottom-line"
              className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 scroll-mt-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-2">Bottom Line</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Shop with confidence at WheelTireUSA. From our 30-day return guarantee to our
                    fitment promise, you're protected. This is all part of our commitment to
                    transparent, fair, and convenient service — keeping you as a customer for life,
                    not just one sale.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary hover:underline"
                  >
                    Start a return
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

export default ReturnPolicyContent;
