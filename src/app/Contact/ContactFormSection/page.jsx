"use client";
import Image from "next/image";

export default function ContactFormSection() {
  return (
    <section className="bg-white w-full px-3 sm:px-10 pt-3 pb-20">
      <div className="max-w-[1456px] mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-40 xl:gap-[200px] 2xl:gap-60 items-center">
          <div className="hidden lg:flex justify-center h-full w-full">
            <Image
              src="https://kachabazar-store-nine.vercel.app/_next/image?url=%2Fcontact-us.png&w=1920&q=75"
              alt="Contact Illustration"
              width={600}
              height={600}
              className=" my-auto bg-cover w-auto h-auto "
              priority
            />
          </div>

          <div className="flex flex-col justify-center sm:py-11 lg:py-0">
            <h2 className="text-2xl lg:text-3xl font-sans font-medium text-gray-900 mb-3">
              For any suppoort just send your query
            </h2>
            <p className="text-gray-800 font-sans mb-12 leading-7 ">
              Collaboratively promote client-focused convergence vis-a-vis
              customer-directed alignments via plagiarized strategic users and
              standardized infrastructures.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full border border-gray-100 rounded-md px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full border border-gray-100 rounded-md px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <input
                type="text"
                placeholder="Enter Your Subject"
                className="w-full border border-gray-210 rounded-md px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message here"
                  className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-emerald-500 text-white font-semibold w-full sm:w-auto text-sm lg:text-[16px] px-6 lg:px-8 py-3.5 lg:py-3 rounded-md hover:bg-emerald-600 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
