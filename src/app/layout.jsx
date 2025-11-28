// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Mainheader from "@/components/layout/Header/page";
// import Footer from "@/components/layout/Footer/page";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Front-Store",
//   description: "",
//   icons: {
//     icon: "https://kachabazar-preview.netlify.app/assets/img/favicon.png",
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable}  overflow-y-scroll antialiased`}
//       >
//         <Mainheader />
//         <main className="pt-20 lg:pt-[162px]">{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Mainheader from "@/components/layout/Header/page";
import Footer from "@/components/layout/Footer/page";
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
          <Mainheader />
          <main className="pt-20 lg:pt-[162px]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
