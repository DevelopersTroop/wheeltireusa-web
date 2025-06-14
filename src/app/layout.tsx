import { Footer } from '@/components/shared/Footer/Footer';
import { GoogleMapScriptLoader } from '@/components/shared/googleMapScriptLoader';
import { Header } from '@/components/shared/Header/Header';
import { CheckoutProvider } from '@/context/checkoutContext';
import ReduxWrapper from '@/redux/ReduxWrapper';
import '@/styles/globals.css';
import { metaDataHelper } from '@/utils/metadata';
import { DM_Sans } from 'next/font/google';
import { Toaster } from 'sonner';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Home - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com',
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <GoogleMapScriptLoader>
          <ReduxWrapper>
            <CheckoutProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </CheckoutProvider>
          </ReduxWrapper>
          <Toaster richColors />
        </GoogleMapScriptLoader>
      </body>
    </html>
  );
}
