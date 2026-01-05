import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./redux/Providers";
import Toast from "@/components/global/toast";
import { CouponProvider } from "@/contexts/CouponContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
        className={`${inter.variable} ${jetbrainsMono.variable} overflow-y-scroll antialiased`}
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
