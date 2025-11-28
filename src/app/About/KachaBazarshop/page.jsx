"use client";
import Image from "next/image";

export default function KachaBazarshop() {
  return (
    <section className="bg-white w-full px-4 sm:px-10">
      <div className="max-w-[1456px] mx-auto py-10 lg:py-20 ">
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-xl lg:text-3xl font-semibold text-gray-900 pb-3 ">
              Welcome to our KachaBazar shop
            </h2>
            <p className=" text-base opacity-90 leading-7 text-gray-700 mb-8">
              Holisticly seize parallel metrics and functional ROI.Seamlessly
              revolutionize error-free internal or organic sources before
              effective scenarios. Progressively incentivize state of the art
              applications for efficient intellectual capital. Credibly leverage
              existing distinctive mindshare through cutting-edge schemas.
              Proactively procrastinate team building paradigms coordinate
              client-centric total transparent internal. Dynamically embrace
              diverse customer service and installed base paradigms. Credibly
              seize enterprise-wide experiences for end-to-end data.
              Professionally brand flexible alignments and cost effective
              architectures. Enthusiastically incentivize seamless communities
              with seamlessly facilitate revolutionary metrics with strategic
              theme areas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
              <div className="border rounded-xl p-8 bg-indigo-50 hover:shadow-md transition">
                <h3 className="text-3xl font-extrabold mb-4 text-gray-900">
                  8K
                </h3>
                <p className="font-bold font-sans text-lg text-gray-800 mt-1">
                  Lovely Customer
                </p>
                <p className="text-md  font-sans text-gray-800 mt-1 leading-7">
                  Competently productize virtual models without performance.
                </p>
              </div>

              <div className="border rounded-xl p-8 bg-indigo-50 hover:shadow-md transition">
                <h3 className="text-3xl font-extrabold mb-4 text-gray-900">
                  10K
                </h3>
                <p className="font-bold text-lg text-gray-800 mt-1">
                  Listed Products
                </p>
                <p className="text-md  font-sans text-gray-800 mt-1 leading-7">
                  Dynamically morph team driven partnerships after vertical.
                </p>
              </div>
            </div>
          </div>

          <div className="h-full w-full flex justify-center ">
            <Image
              src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1697439245%2Fsettings%2Fv7g6gowiju0wanpwx70f.jpg&w=1920&q=75"
              alt="Shop"
              width={600}
              height={400}
              className="rounded-xl my-auto bg-cover w-auto h-auto "
            />
          </div>
        </div>
        <p className="mt-10 lg:mt-16 text-base opacity-90 leading-7 text-black">
          Holisticly seize parallel metrics and functional ROI. Seamlessly
          revolutionize error-free internal or organic sources before effective
          scenarios. Progressively incentivize state of the art applications for
          efficient intellectual capital. Credibly leverage existing distinctive
          mindshare through cutting-edge schemas. Proactively procrastinate team
          building paradigms coordinate client-centric total transparent
          internal. Energistically reconceptualize global leadership for
          high-quality networks. Credibly restore an expanded array of systems
          rather than accurate results. Collaboratively synergize backend
          bandwidth without 24/7 functionalities. Credibly utilize proactive
          ideas whereas cross-media core competencies. Uniquely maximize
          professional best practices through resource maximizing services.
          Conveniently architect cross-unit web services for e-business
          imperatives.
        </p>
        <p className="mt-4 text-base opacity-90 leading-7 text-black">
          Appropriately visualize market-driven data before one-to-one
          scenarios. Collaboratively productize multifunctional ROI through
          intuitive supply chains. Enthusiastically seize revolutionary value
          and process-centric services. Competently harness intuitive
          information after interoperable markets. Interactively revolutionize
          future-proof value before granular sources. Dynamically embrace
          diverse customer service and installed base paradigms. Credibly seize
          enterprise-wide experiences for end-to-end data. Professionally brand
          flexible alignments and cost effective architectures. Enthusiastically
          incentivize seamless communities with seamlessly facilitate
          revolutionary metrics with strategic theme areas.
        </p>
        <div className="h-auto w-auto mt-12">
          <Image
            src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1697439195%2Fsettings%2Fsl8vzvzm54jgzq6sphn2.jpg&w=3840&q=75"
            alt="Shop"
            width={600}
            height={400}
            className="rounded-xl  w-full h-full "
          />
        </div>
      </div>
    </section>
  );
}
