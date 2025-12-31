"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera } from "react-icons/fi";
import { FiUploadCloud } from "react-icons/fi";

export default function UpdateProfilePage() {
  const { user } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    avatar: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setForm({ ...form, avatar: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full px-6 py-3">
      <div className="flex items-center gap-3 py-5">
        <div className="w-10 h-10 bg-gradient-to-br text-xl from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <FiUser />
        </div>
        <div>
          <h1 className="text-xl font-bold font-sans  text-gray-900">
            Update Profile
          </h1>
          <p className="text-sm text-gray-500">
            Update your personal information
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl px-8.5 py-9  shadow-md "
      >
        <div className="mb-6">
          <label className="text-sm font-sans font-medium text-gray-700 flex items-center gap-2 mb-3">
            <FiCamera className="text-[16px]" /> Profile Photo
          </label>

          <label className="flex flex-col items-center justify-center  border-2 border-dashed border-gray-300 rounded-lg  p-6 cursor-pointer hover:border-green-500 transition">
            <input type="file" hidden accept="image/*" onChange={handleImage} />
            <span className="text-green-600 text-2xl mb-1">
              <FiUploadCloud className="text-3xl" />
            </span>
            <p className="text-sm text-gray-600 py-1">Drag your image here</p>
            <p className="text-xs  text-gray-400">
              (Only *.jpeg and *.png images will be accepted)
            </p>
          </label>

          <div className="inline-flex border rounded-md border-gray-100 w-24 max-h-24 p-2  my-3">
            <Image
              src={user?.avatar || "/assets/placeholder_kvepfp.png"}
              alt="avatar"
              width={64}
              height={64}
              className="rounded-md border bg-cover h-full w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Full Name<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-4 text-xl text-gray-400" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="h-12 text-sm text-black pl-11 pr-4 w-full rounded-xl border border-gray-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-4 text-xl text-gray-400" />
              <input
                disabled
                value={user?.email}
                className="h-12 text-sm text-black pl-11 pr-4 w-full rounded-xl border border-gray-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Email cannot be changed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Phone/Mobile
              </label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-4 text-xl text-gray-400" />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="h-12 text-sm text-black pl-11 pr-4 w-full rounded-xl border border-gray-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Address
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-4 text-xl text-gray-400" />

                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="h-12 text-sm text-black pl-11 pr-4 w-full rounded-xl border border-gray-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-8">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✓ Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
