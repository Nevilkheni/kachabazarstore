import Mainheader from "@/components/header/page";
import Footer from "@/components/footer/page";

export default function Layout({ children }) {
  return (
    <>
      <Mainheader />
      <main className="pt-20 lg:pt-[162px]">{children}</main>
      <Footer />
    </>
  );
}
