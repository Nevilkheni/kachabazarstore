import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./redux/Providers";

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
    icon: "https://kachabazar-preview.netlify.app/assets/img/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-y-scroll antialiased`}
      >
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
