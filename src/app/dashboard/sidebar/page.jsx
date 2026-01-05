"use client";

import { FiUser, FiSettings, FiStar } from "react-icons/fi";
import { IoMdGrid } from "react-icons/io";
import { VscThreeBars } from "react-icons/vsc";
import { CiFileOn } from "react-icons/ci";
import { LuLockOpen } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from "../../../components/global/logout";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isExact = (path) => pathname === path;
  const isSection = (path) => pathname.startsWith(path);

  return (
<<<<<<< HEAD
    <div className="w-full bg-[#f9fafb]white p-8 pb-5">
=======
    <div className="w-full bg-[#f9fafb] p-8 pb-5">
>>>>>>> 4d3a92ceb66327c8e7bc3cc619b3677a47ab2d9d
      {user ? (
        <div className="flex gap-4 sm:gap-3 items-center py-1.5  ">
          <div className=" rounded-full shrink-0">
            <Image
              src={user.avatar || "/public/assets/placeholder_kvepfp.png"}
              alt="pfp"
              height={1}
              width={1}
              className="text-white cursor-pointer sm:h-15 sm:w-15 h-8 w-8 rounded-full "
            />
          </div>

          <div>
            <h2 className="text-md lg:text-lg font-semibold text-black leading-tight">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 -mt-0.5 sm:-mt-1">
              {user.email}
            </p>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className=" ml-auto block lg:hidden "
          >
            <MdKeyboardArrowDown className="text-3xl text-gray-700" />
          </button>
        </div>
      ) : (
        <div className="flex gap-3 items-center py-1.5  ">
          <div className=" rounded-full">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s"
              alt="pfp"
              height={1}
              width={1}
              className="text-white cursor-pointer h-15 w-15 rounded-full "
            />
          </div>

          <div>
            <h2 className="text-md lg:text-lg font-semibold text-black leading-tight">
              User Name
            </h2>
            <p className="text-sm text-gray-500 -mt-1">user@gmail.com</p>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className=" ml-auto block lg:hidden "
          >
            <MdKeyboardArrowDown className="text-3xl text-gray-700" />
          </button>
        </div>
      )}

      <div className={`${open ? "block" : "hidden"} lg:block`}>
        <ul className="space-y-2 py-6 text-sm font-medium">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2.5 py-2.5 px-4 rounded-lg
              ${isExact("/dashboard")
                ? "bg-[#DFFBE9] text-green-600"
                : "hover:bg-gray-100 text-gray-600"
              }
            `}
          >
            <IoMdGrid className="text-lg" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/my-orders?page=1"
            className={`flex items-center gap-3.5 py-2.5 px-4 rounded-lg
              ${isSection("/dashboard/my-orders")
                ? "bg-[#DFFBE9] text-green-600"
                : "hover:bg-gray-100 text-gray-600"
              }
            `}
          >
            <VscThreeBars className="text-md" />
            My Orders
          </Link>

<<<<<<< HEAD
          {/* <li className="flex items-center gap-2.5 py-2.5 px-4 hover:bg-gray-100 rounded-lg text-gray-600">
            <FiStar className="text-lg" />
            My Review
          </li> */}

          <Link
            href="/dashboard/myreview"
            className={`flex items-center gap-2.5 py-2.5 px-4 rounded-lg
              ${isExact("/dashboard/my-account")
                ? "bg-[#DFFBE9] text-green-600"
                : "hover:bg-gray-100 text-gray-600"
              }
            `}
          >
            <FiUser className="text-lg" />
            My Review
=======
          <Link
            href="/dashboard/my-review"
            className={`flex items-center gap-2.5 py-2.5 px-4 rounded-lg
              ${isSection("/dashboard/my-review")
                ? "bg-[#DFFBE9] text-green-600"
                : "hover:bg-gray-100 text-gray-600"
              }
            `}
          >
            <FiStar className="text-lg" />
            My Review
>>>>>>> 4d3a92ceb66327c8e7bc3cc619b3677a47ab2d9d
          </Link>

          <Link
            href="/dashboard/my-account"
            className={`flex items-center gap-2.5 py-2.5 px-4 rounded-lg
              ${isExact("/dashboard/my-account")
                ? "bg-[#DFFBE9] text-green-600"
                : "hover:bg-gray-100 text-gray-600"
              }
            `}
          >
            <FiUser className="text-lg" />
            My Account
          </Link>

          <Link
            href="/dashboard/update-profile"
            className={`flex items-center gap-2.5 py-2.5 px-4 rounded-lg
              ${isExact("/dashboard/update-profile")
                ? "bg-[#DFFBE9] text-green-600"
                : "hover:bg-gray-100 text-gray-600"
              }
            `}
          >
            <FiSettings className="text-lg" />
            Update Profile
          </Link>

          <Link
            href="/dashboard/change-password"
            className={`flex items-center gap-2.5 py-2.5 px-4 rounded-lg
              ${isExact("/dashboard/change-password")
                ? "bg-[#DFFBE9] text-green-600"
                : "hover:bg-gray-100 text-gray-600"
              }
            `}
          >
            <CiFileOn className="text-lg" />
            Change Password
          </Link>

          <button
            onClick={() => handleLogout(dispatch)}
            className="flex items-center gap-2 py-2.5 px-3 hover:bg-gray-100 rounded-lg text-gray-600 w-full text-left"
          >
            <LuLockOpen className="text-[16px]" />
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
}
