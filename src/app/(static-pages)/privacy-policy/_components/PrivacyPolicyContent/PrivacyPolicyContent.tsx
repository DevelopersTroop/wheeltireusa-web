import Container from '@/components/ui/container/container';

const sections = [
  {
    id: 'collection',
    number: '01',
    title: 'Information We Collect',
    intro: 'We may collect the following personal information when you use our site:',
    items: [
      'Name',
      'Email address',
      'Billing & shipping address',
      'Phone number',
      'Payment information',
      'Vehicle information',
      'IP address and browsing data',
    ],
  },
  {
    id: 'usage',
    number: '02',
    title: 'How We Use Information',
    intro: 'We use your information to:',
    items: [
      'Process orders',
      'Provide customer support',
      'Improve website performance',
      'Prevent fraud',
      'Send marketing communications (if opted-in)',
    ],
  },
  {
    id: 'sharing',
    number: '03',
    title: 'Sharing Information',
    intro: 'We may share data with trusted third parties including:',
    items: [
      'Payment processors',
      'Shipping carriers',
      'Marketing service providers',
      'Analytics providers',
    ],
    footer: 'We do not sell personal data in the traditional sense.',
  },
  {
    id: 'cookies',
    number: '04',
    title: 'Cookies & Tracking',
    intro: 'We use cookies to:',
    items: [
      'Improve website functionality',
      'Analyze traffic',
      'Personalize content',
      'Provide targeted advertising',
    ],
    footer: 'You can manage cookie preferences through your browser settings.',
  },
  {
    id: 'security',
    number: '05',
    title: 'Data Security',
    body: 'We implement reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorized access, disclosure, or misuse.',
  },
  {
    id: 'rights',
    number: '06',
    title: 'Your Rights',
    intro: 'Depending on your state or country, you may have the right to:',
    items: [
      'Access your data',
      'Correct inaccurate data',
      'Request deletion',
      'Opt out of marketing communications',
    ],
  },
];

const navItems = [
  { id: 'collection', label: 'Information We Collect' },
  { id: 'usage',      label: 'How We Use Information' },
  { id: 'sharing',    label: 'Sharing Information' },
  { id: 'cookies',    label: 'Cookies & Tracking' },
  { id: 'security',   label: 'Data Security' },
  { id: 'rights',     label: 'Your Rights' },
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

const PrivacyPolicyContent = () => {
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
                Privacy requests
              </p>
              <a
                href="mailto:privacy@wheeltireusa.com"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline break-all"
              >
                privacy@wheeltireusa.com
              </a>
            </div>
          </aside>

          {/* ── Main content ─────────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Intro card */}
            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
              <p className="text-muted-foreground leading-relaxed">
                At <span className="font-semibold text-foreground">WheelTireUSA</span>, your
                privacy matters. This policy explains what personal information we collect, why
                we collect it, and how we protect it. We are committed to handling your data
                with transparency and care.
              </p>
            </div>

            {/* Section cards */}
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="rounded-2xl border border-border bg-background p-6 sm:p-8 scroll-mt-8"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {section.number}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-snug pt-1.5">
                    {section.title}
                  </h2>
                </div>
                <div className="h-px bg-border mb-5" />

                {/* Body */}
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  {section.intro && <p className="text-sm">{section.intro}</p>}
                  {section.items && <BulletList items={section.items} />}
                  {section.body  && <p className="text-sm">{section.body}</p>}
                  {section.footer && (
                    <p className="text-sm pt-1 border-t border-border mt-4">{section.footer}</p>
                  )}

                  {/* Special CTA for Your Rights section */}
                  {section.id === 'rights' && (
                    <div className="mt-4 rounded-xl bg-primary/5 border border-primary/20 p-4 flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          To submit a data request, contact us at:
                        </p>
                        <a
                          href="mailto:privacy@wheeltireusa.com"
                          className="text-sm font-semibold text-primary hover:underline"
                        >
                          privacy@wheeltireusa.com
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Special callout for Cookies */}
                  {section.id === 'cookies' && (
                    <div className="mt-4 rounded-xl bg-secondary border border-border p-4 flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                      </svg>
                      <p className="text-sm text-muted-foreground">
                        You can manage or disable cookies through your browser settings at any time.
                        Disabling cookies may affect some site functionality.
                      </p>
                    </div>
                  )}

                  {/* Special callout for Data Security */}
                  {section.id === 'security' && (
                    <div className="mt-2 grid sm:grid-cols-3 gap-3">
                      {[
                        { label: 'Administrative', icon: '🛡️', desc: 'Access controls & internal policies' },
                        { label: 'Technical',      icon: '🔒', desc: 'Encryption & secure infrastructure' },
                        { label: 'Physical',       icon: '🏢', desc: 'Secure data centre facilities' },
                      ].map((s) => (
                        <div key={s.label} className="rounded-xl bg-secondary border border-border p-4 text-center">
                          <div className="text-2xl mb-2">{s.icon}</div>
                          <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-1">{s.label}</p>
                          <p className="text-xs text-muted-foreground">{s.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            ))}

            {/* Footer note */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex items-start gap-4">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              </svg>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Have questions about this Privacy Policy?{' '}
                <a href="/contact" className="text-primary font-semibold hover:underline">
                  Contact us
                </a>{' '}
                and we'll be happy to help.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicyContent;
