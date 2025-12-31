"use client";

import Image from "next/image";
import { useSelector } from "react-redux";

export default function MyAccountPage() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="grid px-6 py-8  grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="relative border border-gray-200 rounded-lg p-4 bg-white">
        <button className="absolute top-2 right-2 bg-cyan-600 text-white px-3 py-1 rounded hover:bg-cyan-700">
          Edit
        </button>

        <div className="flex py-3  items-center gap-4">
          <Image
            src={user?.avatar || "/assets/placeholder_kvepfp.png"}
            alt="avatar"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />

          <div className="leading-7">
            <h2 className="text-[15px] font-semibold text-gray-900">
              {user?.name}
            </h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">{user?.phone || "—"}</p>
          </div>
        </div>
      </div>

      <div className="relative border border-gray-200 rounded-lg p-4 bg-white">
        <button className="absolute top-2 right-2 bg-cyan-600 text-white px-3 py-1 rounded hover:bg-cyan-700">
          Edit
        </button>

        <h2 className="text-[15px] font-semibold text-gray-900 mb-2">
          {user?.name}{" "}
          <span className="text-xs  font-sans font-medium  text-gray-500">
            (Default Shipping Address)
          </span>
        </h2>

        <p className="text-sm text-gray-500 mb-1">{user?.phone}</p>

        <p className="text-sm text-gray-500 mb-1">{user?.address?.street}</p>

        <p className="text-sm text-gray-500">
          {user?.address?.country}, {user?.address?.state},{" "}
          {user?.address?.city}
        </p>
      </div>
    </div>
  );
}
