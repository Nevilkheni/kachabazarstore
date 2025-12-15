"use client";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Singup() {
  return (
    <div className=" p-3  sm:p-9 lg:p-12 flex items-center justify-center bg-[#f7f8f9]">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.08)] p-5 sm:p-10 ">
        <h2 className="text-2xl text-black font-sans font-medium text-center mb-1">
          Welcome to Kachabazar Store
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Get started - its free.
        </p>
        <div className="flex flex-col gap-6 mr-2">
          <button
            onClick={() =>
              (window.location.href = `${process.env.NEXT_PUBLIC_GOOGLE_BACKEND_PORT}/auth/google`)
            }
            className="w-full text-sm font-medium font-sans flex items-center justify-center gap-4 bg-[#00A550] hover:bg-[#009647] text-white py-2.5 rounded-md transition"
          >
            <FaGoogle className="text-lg rounded-full  " />
            Sign Up With Google
          </button>

          <button className="w-full flex text-sm font-medium font-sans items-center justify-center gap-4 bg-[#2B7BFF] hover:bg-[#2168e8] text-white py-2.5 rounded-md  transition">
            <FaFacebookF className="text-[18px]" />
            Sign Up With Facebook
          </button>

          <button
            onClick={() =>
              (window.location.href = `${process.env.NEXT_PUBLIC_GITHUB_BACKEND_PORT}/auth/github`)
            }
            className="w-full flex text-sm font-medium font-sans items-center justify-center gap-4 bg-[#343A40] hover:bg-[#2d3237] text-white py-2.5 rounded-md  transition"
          >
            <FaGithub className="text-[18px]" />
            Sign Up With Github
          </button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-10">
          Already have an account?
          <Link href="./login" className="text-black ml-2 font-sans font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
