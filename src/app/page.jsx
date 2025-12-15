import Mainheader from "@/components/header/page";
import Herosection from "./home/page";
import Footer from "@/components/footer/page";
export default function Home() {
  return (
    <>
      <Mainheader />
      <main className="pt-20 lg:pt-[162px]">
        <Herosection />
      </main>
      <Footer />
    </>
  );
}
