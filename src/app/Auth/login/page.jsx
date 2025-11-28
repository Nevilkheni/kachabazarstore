"use client";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { LuLock } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className=" p-3  sm:p-9 lg:p-12 flex items-center justify-center bg-[#f7f8f9]">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.08)] p-5 sm:p-10 ">
        <h2 className="text-3xl text-black font-bold text-center mb-1">
          Login
        </h2>
        <p className="text-gray-500 text-center mb-3">
          Login with your email and password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-600">
                <CiMail />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="justin@gmail.com"
                className="w-full border rounded-md py-2 text-sm pl-10 pr-3 border-gray-200 text-black focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-600">
                <LuLock />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••"
                className="w-full border rounded-md py-2 text-sm pl-10 pr-3 border-gray-200 text-black focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-sm font-sans  bg-[#00bba7] hover:bg-[#00b89b] text-white font-medium py-2.5 mt-1 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="text-black font-sans font-medium text-md">OR</span>
        </div>
        <div className="flex flex-col gap-6 mr-2">
          <button className="w-full text-sm font-medium font-sans flex items-center justify-center gap-4 bg-[#00A550] hover:bg-[#009647] text-white py-2.5 rounded-md transition">
            <FaGoogle className="text-lg rounded-full  " />
            Login With Google
          </button>

          <button className="w-full flex text-sm font-medium font-sans items-center justify-center gap-4 bg-[#2B7BFF] hover:bg-[#2168e8] text-white py-2.5 rounded-md  transition">
            <FaFacebookF className="text-[18px]" />
            Login With Facebook
          </button>

          <button className="w-full flex text-sm font-medium font-sans items-center justify-center gap-4 bg-[#343A40] hover:bg-[#2d3237] text-white py-2.5 rounded-md  transition">
            <FaGithub className="text-[18px]" />
            Login With Github
          </button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-10">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-black font-sans font-bold">
            {""}Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
