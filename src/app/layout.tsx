import { DynamicAnalytics } from '@/components/dynamic-analytics';
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="G4LsRlcamoA4V3m5VSv8_S7IGt__ynuOev4JqtfUw5k"
        />
        <link rel="icon" href="/images/fav.ico" />
      </head>
      <body className={`${dmSans.variable} antialiased`}>
        <GoogleMapScriptLoader>
          <ReduxWrapper>
            <CheckoutProvider>
              <Header />
              <DynamicAnalytics />
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
