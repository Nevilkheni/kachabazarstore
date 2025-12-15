"use client";
import DescriptionFAQ from "./faqdescription/page";

export default function faq() {
  return (
    <section>
      <div className="relative w-full">
        <div
          className="flex justify-center items-center py-10 lg:py-20 w-full bg-cover bg-no-repeat bg-bottom"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/ahossain/image/upload/v1697439245/settings/yw3cd2xupqwqpqcbxv9l.jpg")',
          }}
        >
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-black text-center">
            FAQs
          </h1>
        </div>
      </div>
      <DescriptionFAQ />
    </section>
  );
}
