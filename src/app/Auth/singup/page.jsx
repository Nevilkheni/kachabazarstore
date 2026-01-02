"use client";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { LuLock } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import { showToast } from "@/components/global/toast";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getApiUrl,
  getGoogleBackendUrl,
  getGithubBackendUrl,
  getFacebookBackendUrl,
} from "@/utils/apiConfig";

export default function Singup() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      const decodedError = decodeURIComponent(error);
      showToast({
        type: "error",
        title: "Authentication Error",
        message: decodedError || "User already exists with this account",
        duration: 5000,
      });
      router.replace("/Auth/singup");
    }
  }, [searchParams, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${getApiUrl()}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        showToast({
          type: "success",
          title: "User Registered successfully ",
          message: "Your account has been created successfully",
          duration: 3000,
        });
        setTimeout(() => {
          router.push("/Auth/login");
        }, 2000);
      } else {
        showToast({
          type: "error",
          title: "Registration failed",
          message: data.msg || data.message || "Something went wrong",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      showToast({
        type: "error",
        title: "Registration failed",
        message: "Network error. Please try again.",
        duration: 3000,
      });
    }
  };

  return (
    <div className=" p-3  sm:p-9 lg:p-14 flex items-center justify-center bg-[#f7f8f9]">
      <div className="bg-white w-full max-w-md rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.08)] p-5 sm:p-10 ">
        <h2 className="text-3xl text-black font-sans font-bold text-center mb-1">
          Welcome to Kachabazar Store
        </h2>
        <p className="text-gray-500 text-md text-center my-2">
          Get started - it`s free.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          <label className="block text-sm font-sans font-medium text-gray-700 mb-2.5">
            Name
          </label>
          <div className="relative">
            <span className="absolute  inset-y-0 left-4 flex items-center text-gray-600">
              <FiUser className="text-[20px] text-gray-400" />
            </span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              required
              placeholder="Full Name"
              className="w-full border rounded-lg bg-gray-50 py-2  text-sm pl-12  border-gray-200 text-black focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <label className="block text-sm font-sans font-medium text-gray-700 mb-2.5">
            Email
          </label>
          <div className="relative">
            <span className="absolute  inset-y-0 left-4 flex items-center text-gray-600">
              <CiMail className="text-[21px]" />
            </span>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
              placeholder="Email"
              className="w-full border rounded-lg bg-gray-50 py-2  text-sm pl-12  border-gray-200 text-black focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-2.5">
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-600">
              <LuLock className="text-[20px] text-gray-400" />
            </span>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              required
              placeholder="Password"
              className="w-full border rounded-lg bg-gray-50 py-2  text-sm pl-12  border-gray-200 text-black focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          {/* <p className="text-sm py-5 font-medium font-sans text-emerald-600 text-right">
            Forgot password?
          </p> */}
          <button
            type="submit"
            className="w-full h-10 font-semibold rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        <div className="flex flex-col gap-3 ">
          <span className="text-gray-400 py-3 text-center  font-sans font-medium text-sm">
            Or continue with
          </span>
          <button
            onClick={() =>
              (window.location.href = `${getGoogleBackendUrl()}/auth/google`)
            }
            className="w-full text-black border-gray-200 border-2 text-sm font-medium font-sans flex items-center justify-center gap-3.5 py-2 rounded-lg "
          >
            <FaGoogle className="text-[16px] rounded-full  " />
            Sign Up With Google
          </button>

          <button
            onClick={() =>
              (window.location.href = `${getFacebookBackendUrl()}/auth/facebook`)
            }
            className="w-full flex text-sm font-medium font-sans items-center justify-center gap-3 bg-[#2B7BFF] hover:bg-[#2168e8] text-white py-2.5 rounded-lg  transition">
            <FaFacebookF className="text-[20px]" />
            Sign Up With Facebook
          </button>

          <button
            onClick={() =>
              (window.location.href = `${getGithubBackendUrl()}/auth/github`)
            }
            className="w-full flex text-sm font-medium font-sans items-center justify-center gap-3 bg-[#343A40] hover:bg-[#2d3237] text-white py-2.5 rounded-lg  transition"
          >
            <FaGithub className="text-[20px]" />
            Sign Up With Github
          </button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-10">
          Already have an account?
          <Link
            href="./login"
            className="text-green-500 ml-2 font-sans font-bold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
