"use client";
import { FiUser, FiSettings, FiStar } from "react-icons/fi";
import { IoMdGrid } from "react-icons/io";
import { VscThreeBars } from "react-icons/vsc";
import { CiFileOn } from "react-icons/ci";
import Image from "next/image";
import { LuLockOpen } from "react-icons/lu";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../../components/global/logout";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) return null;

        const text = await res.text();
        if (!text) return null;

        return JSON.parse(text);
      })
      .then((data) => {
        console.log("user:", data);
        setUser(data);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  return (
    <div className="w-full border-r border-gray-200  bg-white p-8">
      {user ? (
        <div className="flex gap-4 sm:gap-3 items-center py-1.5  ">
          <div className=" rounded-full shrink-0">
            <Image
              src={user.avatar}
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
        <ul className="space-y-2 py-6 font-sans text-sm font-medium text-gray-600 select-none">
          <li className="flex items-center gap-3 py-2.5 px-4 bg-[#DFFBE9] rounded-lg cursor-pointer text-green-600">
            <IoMdGrid className="text-green-600   text-lg" />
            Dashboard
          </li>

          <li className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-100 rounded-lg cursor-pointer">
            <VscThreeBars className="text-gray-500  text-md" />
            My Orders
          </li>

          <li className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-100 rounded-lg cursor-pointer">
            <FiStar className="text-gray-500   text-lg" />
            My Review
          </li>

          <li className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-100 rounded-lg cursor-pointer">
            <FiUser className="text-gray-500   text-lg" />
            My Account
          </li>

          <li className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-100 rounded-lg cursor-pointer">
            <FiSettings className="text-gray-500   text-lg" />
            Update Profile
          </li>

          <li className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-100 rounded-lg cursor-pointer">
            <CiFileOn className="text-gray-500   text-lg" />
            Change Password
          </li>

          <button
            onClick={() => handleLogout(dispatch)}
            className="flex items-center gap-3.5 py-2.5 px-3  hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <LuLockOpen className="text-gray-600 font-sans font-medium text-lg" />
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
}
