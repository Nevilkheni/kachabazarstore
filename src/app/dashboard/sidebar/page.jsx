import { FiGrid, FiUser, FiSettings, FiLogOut, FiStar } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BiLockAlt } from "react-icons/bi";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-full border-r border-gray-200  bg-white p-6">
      {/* Profile */}
      <div className="flex items-center gap-4 mb-10">
        <div className=""></div>

        <div>
          <h2 className="text-lg font-semibold text-black leading-tight">
            User Name
          </h2>
          <p className="text-sm text-gray-500 -mt-1">user@gmail.com</p>
        </div>
      </div>

      {/* Menu */}
      <ul className="space-y-1 text-[15px] font-medium text-gray-700 select-none">
        {/* Active */}
        <li className="flex items-center gap-3 py-2.5 px-4 bg-[#DFFBE9] rounded-lg cursor-pointer text-black">
          <FiGrid className="text-green-600 text-lg" />
          Dashboard
        </li>

        <li className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-100 rounded-lg cursor-pointer">
          <HiOutlineShoppingBag className="text-gray-600 text-lg" />
          My Orders
        </li>

        <li className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-100 rounded-lg cursor-pointer">
          <FiStar className="text-gray-600 text-lg" />
          My Review
        </li>

        <li className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-100 rounded-lg cursor-pointer">
          <FiUser className="text-gray-600 text-lg" />
          My Account
        </li>

        <li className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-100 rounded-lg cursor-pointer">
          <FiSettings className="text-gray-600 text-lg" />
          Update Profile
        </li>

        <li className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-100 rounded-lg cursor-pointer">
          <BiLockAlt className="text-gray-600 text-lg" />
          Change Password
        </li>

        <Link
          href="/"
          className="flex items-center gap-3 py-2.5 px-4 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <FiLogOut className="text-gray-600 text-lg" />
          Logout
        </Link>
      </ul>
    </div>
  );
}
