import Mainheader from "@/components/header/page";
import Footer from "@/components/footer/page";
import Protected from "@/components/global/Protected";
import Sidebar from "./sidebar/page";

export default function Layout({ children }) {
  return (
    <div className="bg-[#f9fafb]">
      <Protected>
        <Mainheader />
<<<<<<< HEAD
        <div className="flex  bg-[#f9fafb]  pt-20 lg:pt-[162px] lg:flex-row flex-col max-w-[1536px]  mx-auto px-3 lg:px-12 ">
=======
        <div className="flex   pt-20 lg:pt-[162px] lg:flex-row flex-col max-w-[1536px] bg-[#f9fafb] mx-auto px-3 lg:px-12 ">
>>>>>>> 4d3a92ceb66327c8e7bc3cc619b3677a47ab2d9d
          <div className="w-full lg:w-2/5 xl:w-1/4">
            <Sidebar />
          </div>
          <div className="border-r border-gray-200  hidden  lg:block"></div>

          <div className="w-full lg:w-3/5 xl:w-3/4  ">{children}</div>
        </div>
        <Footer />
      </Protected>
    </div>
  );
}
