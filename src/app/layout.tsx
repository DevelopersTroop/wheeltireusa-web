import { Footer } from '@/components/shared/Footer/Footer';
import { Header } from '@/components/shared/Header/Header';
import ReduxWrapper from '@/redux/ReduxWrapper';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { Toaster } from 'sonner';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Tirematic',
  description:
    'Tirematic is a platform for tire dealers to manage their inventory.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <ReduxWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </ReduxWrapper>
        <Toaster />
      </body>
    </html>
  );
}
