import { DynamicAnalytics } from '@/components/dynamic-analytics';
import { Footer } from '@/components/shared-old/Footer/Footer';
import { GoogleMapScriptLoader } from '@/components/shared-old/googleMapScriptLoader';
import Header from '@/components/shared/Header/Header';
import { CheckoutProvider } from '@/context/checkoutContext';
import ReduxWrapper from '@/redux/ReduxWrapper';
import '@/styles/globals.css';
import { metaDataHelper } from '@/utils/metadata';
import { DM_Sans, Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import CartSystem from './cart/v2/page';
import { Metadata } from 'next';
import Script from 'next/script';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wheel Tire USA",
  description:
    "At WheelTireUSA, our goal is simple: deliver the best wheels, tires, and vehicle accessories with service you can rely on. We’re passionate about helping drivers upgrade their vehicles with confidence — whether it’s for style, performance, safety, or all three.",
  openGraph: {
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/fav.ico" />
      </head>
       <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col justify-between antialiased`}
      >
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTMID}');
        `,
          }}
        />
        <Script
          id="brevo-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(d, w, c) {
        w.BrevoConversationsID = '692a60c63198d933ca00c789';
        w[c] = w[c] || function() {
            (w[c].q = w[c].q || []).push(arguments);
        };
        var s = d.createElement('script');
        s.async = true;
        s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
        if (d.head) d.head.appendChild(s);
    })(document, window, 'BrevoConversations');
        `,
          }}
        />
        <GoogleMapScriptLoader>
          <ReduxWrapper>
            <CheckoutProvider>
              <Header />
              <DynamicAnalytics />
              <main>{children}</main>
              <Footer />
            </CheckoutProvider>
            <CartSystem />
          </ReduxWrapper>
          <Toaster richColors />
        </GoogleMapScriptLoader>
      </body>
    </html>
  );
}
