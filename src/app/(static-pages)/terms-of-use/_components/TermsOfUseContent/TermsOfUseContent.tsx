import Container from '@/components/ui/container/container';

const sections = [
  {
    id: 'acceptance',
    number: '01',
    title: 'Acceptance of Terms',
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Welcome to WheelTireUSA ("Company," "we," "us," or "our"). By accessing or using our
          website (the "Site"), you agree to comply with and be bound by these Terms of Use.
        </p>
        <p>If you do not agree, you must discontinue use of the Site immediately.</p>
        <p>
          You represent that you are at least 18 years old or the legal age of majority in your
          jurisdiction.
        </p>
      </div>
    ),
  },
  {
    id: 'access',
    number: '02',
    title: 'Website Access & Permitted Use',
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>You may use this Site solely for lawful purposes and personal or commercial shopping.</p>
        <p>You agree not to:</p>
        <ul className="space-y-2 mt-2">
          {[
            'Use the Site for fraudulent purposes',
            'Attempt to interfere with website security',
            'Use automated systems (bots, scraping tools, etc.) without permission',
            'Misrepresent your identity or vehicle information',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>We reserve the right to suspend or terminate access at our discretion.</p>
      </div>
    ),
  },
  {
    id: 'ip',
    number: '03',
    title: 'Intellectual Property',
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          All content on the Site — including logos, images, product descriptions, videos, text,
          graphics, and software — is owned by or licensed to WheelTireUSA.
        </p>
        <p>
          You may not reproduce, distribute, modify, or commercially exploit any content without
          written permission.
        </p>
      </div>
    ),
  },
  {
    id: 'disclaimer',
    number: '04',
    title: 'Product Information Disclaimer',
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>We strive to ensure accuracy; however:</p>
        <ul className="space-y-2 mt-2">
          {[
            'Fitment information is based on data provided by customers and third parties.',
            'Compatibility is not guaranteed.',
            'Customers are responsible for verifying fitment before installation.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>
          We are not liable for damages resulting from incorrect vehicle information provided by
          users.
        </p>
      </div>
    ),
  },
  {
    id: 'links',
    number: '05',
    title: 'Third-Party Links',
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Our Site may contain links to third-party websites. We are not responsible for the
          content, policies, or practices of third parties.
        </p>
      </div>
    ),
  },
  {
    id: 'liability',
    number: '06',
    title: 'Limitation of Liability',
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>To the maximum extent permitted by law, WheelTireUSA shall not be liable for:</p>
        <ul className="space-y-2 mt-2">
          {[
            'Indirect or consequential damages',
            'Loss of profits',
            'Business interruption',
            'Website downtime',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>Your use of the Site is at your own risk.</p>
      </div>
    ),
  },
  {
    id: 'changes',
    number: '07',
    title: 'Changes to Terms',
    content: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          We may update these Terms of Use at any time. Continued use of the Site constitutes
          acceptance of any modifications.
        </p>
      </div>
    ),
  },
];

export const TermsOfUseContent = () => {
  return (
    <Container>
      <div className="px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* ── Sticky sidebar nav ────────────────────────────────────────── */}
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              Contents
            </p>
            <nav className="flex flex-col gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  <span className="w-5 text-xs font-bold text-primary/60 group-hover:text-primary transition-colors">
                    {s.number}
                  </span>
                  <span className="leading-snug">{s.title}</span>
                </a>
              ))}
            </nav>

            {/* Last updated badge */}
            <div className="mt-8 rounded-xl bg-secondary border border-border p-4">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                Last Updated
              </p>
              <p className="text-sm font-semibold text-foreground">May 2025</p>
            </div>
          </aside>

          {/* ── Main content ──────────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-6">
            {sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="rounded-2xl border border-border bg-background p-6 sm:p-8 scroll-mt-8"
              >
                {/* Section header */}
                <div className="flex items-start gap-4 mb-5">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {section.number}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-snug pt-1.5">
                    {section.title}
                  </h2>
                </div>

                {/* Divider */}
                <div className="h-px bg-border mb-5" />

                {/* Body */}
                {section.content}
              </section>
            ))}

            {/* Footer note */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex items-start gap-4">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              </svg>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Use, please{' '}
                <a href="/contact" className="text-primary font-semibold hover:underline">
                  contact us
                </a>
                . We're happy to help clarify anything.
              </p>
            </div>
          </div>

        </div>
      </div>
    </Container>
  );
};
