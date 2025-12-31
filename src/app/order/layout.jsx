import Mainheader from "@/components/header/page";
import Footer from "@/components/footer/page";
import Protected from "@/components/global/Protected";

export default function Layout({ children }) {
  return (
    <>
      <Protected>
        <Mainheader />
        <main className="pt-20 lg:pt-[162px]">{children}</main>
        <Footer />
      </Protected>
    </>
  );
}
