"use client";
import Link from "next/link";
import Image from "next/image";
import FooterSocialPaymentBottom from "./FooterSocialPaymentBottom/page";
import AppDownloadSection from "./AppDownloadSection/page";
import FeatureStrip from "./FeatureStrip/page";

export default function Footer() {
  return (
    <div className="">
      <AppDownloadSection />
      <FeatureStrip />
      <footer className="bg-white px-4 sm:px-10  border-gray-100 mt-10 pb-16 lg:pb-0">
        <div className="max-w-[1456px] mx-auto my-12 lg:my-[65px]   grid grid-cols-2  md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-12 xl:gap-8">
          <div>
            <h3 className="text-md font-sans font-medium text-gray-900  mb-5 lg:mb-7">
              Company
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <Link href="/About">About Us</Link>
              </li>
              <li>
                <Link href="/Contact">Contact Us</Link>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Latest News</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-sans font-medium text-gray-900 mb-5 lg:mb-7">
              Latest News
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <a href="#">Fish & Meat</a>
              </li>
              <li>
                <a href="#">Soft Drink</a>
              </li>
              <li>
                <a href="#">Milk & Dairy</a>
              </li>
              <li>
                <a href="#">Beauty & Health</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-sans font-medium text-gray-900 mb-5 lg:mb-7">
              My Account
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>
                <a href="#">My Orders</a>
              </li>
              <li>
                <a href="#">Recent Orders</a>
              </li>
              <li>
                <a href="#">Update Profile</a>
              </li>
            </ul>
          </div>

          <div className="space-y-2 ">
            <div className="flex items-center gap-3 pb-8.5">
              <Image
                src="https://res.cloudinary.com/ahossain/image/upload/v1697688576/settings/logo-color_el4zmy.svg"
                alt="Kacha Bazar Logo"
                href="/"
                width={128}
                height={38}
              />
            </div>
            <div className="flex flex-col   gap-2 ">
              <p className="text-sm  text-gray-600 ">
                987 Andre Plain Suite High Street 838, Lake
              </p>
              <p className="text-sm text-gray-600"> Hestertown, USA</p>
            </div>
            <p className="text-sm text-gray-600">Tel : 02.356.1666</p>
            <p className="text-sm text-gray-600">Email : ccruidk@test.com</p>
          </div>
        </div>

        <FooterSocialPaymentBottom />
      </footer>
    </div>
  );
}
