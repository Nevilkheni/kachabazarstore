"use client";
import Mainheader from "@/components/header/page";
import Footer from "@/components/footer/page";
import Protected from "@/components/global/Protected";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function Layout({ children }) {
  return (
    <>
      <Protected>
        <PayPalScriptProvider
          options={{
            "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "AfRpFwzYrv-llXKzGUfWrk8T7bXPFMqesaSRdxiSzd98LCxpEr-02ySkfKZLc-OeQDXpll6GazbSfDAs",
            currency: "USD",
          }}
        >
          <Mainheader />
          <main className="pt-20 lg:pt-[162px]">{children}</main>
          <Footer />
        </PayPalScriptProvider>
      </Protected>
    </>
  );
}
