import ClientComponent from "./ClientComponent";
import Script from "next/script";
export const metadata = {
  title: "Checkout - KTC Audio",
};
export default function Page() {
  return (
    <>
      <ClientComponent />
      <Script
        src={process.env.NEXT_PUBLIC_SNAP_SDK}
        strategy="afterInteractive"
      />
    </>
  );
}
