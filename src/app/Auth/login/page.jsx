"use client";
import Image from "next/image";
import { CiMail } from "react-icons/ci";
import { LuLock } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/userSlice";
import { showToast } from "@/components/global/toast";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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
      router.replace("/Auth/login");
    }
  }, [searchParams, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) return;

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        showToast({
          type: "error",
          title: "Login failed",
          message: data?.msg || "Invalid email or password",
        });
        setLoading(false);
        return;
      }

      try {
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/user`,
          {
            credentials: "include",
          }
        );

        if (userRes.ok) {
          const userData = await userRes.json();
          if (userData) {
            dispatch(setUser(userData));
          }
        }
      } catch (err) {
        console.error("Fetch user after login failed:", err);
      }

      showToast({
        type: "success",
        title: "Login successful",
        message: "Welcome back!",
        duration: 1200,
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Login error:", err);
      showToast({
        type: "error",
        title: "Login error",
        message: "Something went wrong. Please try again.",
      });
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f7f8f9] text-center py-8">
      <div className="relative inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg mb-6">
        <Image
          src="/assets/loginlogo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto p-5 text-white"
        />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-200 rounded-full opacity-60"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-teal-200 rounded-full opacity-60"></div>
      </div>
      <h2 className="text-3xl text-black font-bold text-center mb-2">
        Welcome back
      </h2>
      <p className="text-gray-500 text-center ">
        Sign in to continue to your account
      </p>
      <div className=" p-3  sm:p-8  flex items-center justify-center bg-[#f7f8f9]">
        <div className="bg-white w-full max-w-md rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.08)] p-5 sm:p-8 ">
          <form onSubmit={handleSubmit} className="space-y-5  text-start">
            <div>
              <label className="block text-sm font-sans font-medium text-gray-700 mb-2.5">
                Email Address
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
                  placeholder="justin@gmail.com"
                  className="w-full border rounded-lg bg-gray-50 py-2  text-sm pl-12  border-gray-200 text-black focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
            </div>

            <div>
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
                  placeholder="•••••••"
                  className="w-full border rounded-lg bg-gray-50 py-2  text-sm pl-12  border-gray-200 text-black focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
            </div>
            <p className="text-sm font-medium font-sans text-emerald-600 text-right">
              Forgot password?
            </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 font-semibold rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              {loading ? "Sing in" : "Sign In"}
            </button>
          </form>

          <div className="flex items-center justify-center my-4">
            <span className="text-gray-400 py-2 font-sans font-medium text-sm">
              Or continue with
            </span>
          </div>
          <div className="flex flex-col gap-3 ">
            <button
              onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_GOOGLE_BACKEND_PORT || 'http://localhost:8000'}/auth/google`)
              }
              className="w-full text-black border-gray-200 border-2 text-sm font-medium font-sans flex items-center justify-center gap-3.5 py-2 rounded-lg "
            >
              <FaGoogle className="text-[16px] rounded-full  " />
              Login With Google
            </button>

            <button
              onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_FACEBOOK_BACKEND_PORT || 'http://localhost:8000'}/auth/facebook`)
              }
              className="w-full flex text-sm font-medium font-sans items-center justify-center gap-3 bg-[#2B7BFF] hover:bg-[#2168e8] text-white py-2.5 rounded-lg  transition">
              <FaFacebookF className="text-[20px]" />
              Login With Facebook
            </button>

            <button
              onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_GITHUB_BACKEND_PORT || 'http://localhost:8000'}/auth/github`)
              }
              className="w-full flex text-sm font-medium font-sans items-center justify-center gap-3 bg-[#343A40] hover:bg-[#2d3237] text-white py-2.5 rounded-lg  transition"
            >
              <FaGithub className="text-[20px]" />
              Login With Github
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Don’t have an account?{" "}
            <Link
              href="./singup"
              className="text-green-500 font-sans font-medium"
            >
              {""}Sign Up
            </Link>
          </p>
        </div>
      </div>
      <p className="text-center text-gray-600 text-sm font-sans ">
        Protected by industry-standard encryption
      </p>
    </div>
  );
}
