import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./redux/Providers";
import Toast from "@/components/global/toast";
import { CouponProvider } from "@/contexts/CouponContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Front-Store",
  description: "",
  icons: {
    icon: "/assets/weblogo.png ",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-y-scroll antialiased`}
      >
        <Providers>
          <CouponProvider>
            <main>{children}</main>
          </CouponProvider>
        </Providers>
        <Toast />
      </body>
    </html>
  );
}
