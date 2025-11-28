"use client";
import { LuMail } from "react-icons/lu";
import { FiBell } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function ContactInfo() {
  return (
    <section className="bg-white w-full px-4 sm:px-10 py-10 lg:py-20">
      <div className="max-w-[1456px] mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          <div className="border border-gray-200 rounded-lg p-10 text-center ">
            <div className="flex justify-center mb-4">
              <LuMail className="text-emerald-500 text-4xl" />
            </div>
            <h3 className="text-xl font-bold font-sans text-gray-900 mb-2">
              Email Us
            </h3>
            <p className="text-md leading-7 font-sans text-gray-600">
              <a
                href="mailto:info@kachabazar.com"
                className="text-emerald-500 hover:underline"
              >
                info@kachabazar.com
              </a>{" "}
              Interactively grow empowered for process-centric total linkage.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-10 text-center ">
            <div className="flex justify-center mb-4">
              <FiBell className="text-emerald-500 text-4xl" />
            </div>
            <h3 className="text-xl font-bold font-sans text-gray-900 mb-2">
              Call Us
            </h3>
            <p className="text-md leading-7 font-sans text-gray-600">
              <a
                href="tel:029-00124667"
                className="text-emerald-500 hover:underline"
              >
                029-00124667
              </a>{" "}
              Distinctively disseminate focused solutions clicks-and-mortar
              ministate.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-10 text-center ">
            <div className="flex justify-center mb-4">
              <HiOutlineLocationMarker className="text-emerald-500 text-4xl" />
            </div>
            <h3 className="text-xl font-bold font-sans text-gray-900 mb-2">
              Location
            </h3>
            <p className="text-md leading-7 font-sans text-gray-600">
              Boho One, Bridge Street West, Middlesbrough, North Yorkshire, TS2
              1AE.
              <br />
              561-4535 Nulla LA
              <br />
              United States 96522.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
