import Footer from "@/components/footer/page";
import Mainheader from "@/components/header/page";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Mainheader />
      <div className="pt-20 lg:pt-[162px]">
        <div className=" flex flex-col items-center justify-center py-32 text-center bg-gray-50">
          <h1 className="text-md   font-sans font-medium text-blue-600 ">
            404
          </h1>
          <h1 className="mt-4 text-3xl font-bold tracking-tight font-sans text-gray-900  sm:text-5xl">
            Page not found
          </h1>
          <p className="text-md text-gray-600 mt-6">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="flex justify-center items-center text-sm font-medium font-sans mt-10">
            <Link
              href="/"
              className="p-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Go back home
            </Link>
            <Link href="#" className="px-6 py-3 text-black">
              Contact support →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
