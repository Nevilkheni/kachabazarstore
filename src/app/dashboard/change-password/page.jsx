"use client";
import { HiOutlineKey } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useSelector } from "react-redux";

export default function ChangePasswordPage() {
  // Get user data from Redux store
  const user = useSelector((state) => state.user.user);

  return (
    <div className=" flex justify-center py-8 lg:px-6">
      <div className="w-full">
        <div className="flex  items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <HiOutlineKey className="text-xl" />
          </div>

          <div>
            <h1 className="text-xl font-sans font-bold text-gray-900">
              Change Password
            </h1>
            <p className="text-sm text-gray-500">
              Update your account password for security
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full py-2 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-sm focus:outline-none  focus:ring-1 focus:ring-teal-300"
                />
                <span className=" absolute inset-y-0 left-4 flex items-center text-gray-400 text-xl">
                  <MdOutlineMailOutline />
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full py-2 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-sm focus:outline-none  focus:ring-1 focus:ring-teal-300"
                />
                <span className=" absolute inset-y-0 left-4 flex items-center text-gray-400 text-xl">
                  <HiOutlineLockClosed />
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full py-2 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-sm focus:outline-none  focus:ring-1 focus:ring-teal-300"
                />
                <span className=" absolute inset-y-0 left-4 flex items-center text-gray-400 text-xl">
                  <HiOutlineKey />
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl px-4 py-5">
              <p className="text-sm font-medium text-gray-800 mb-2">
                Password requirements:
              </p>
              <ul className="space-y-1 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  ✔ At least 8 characters
                </li>
                <li className="flex items-center gap-2">
                  ✔ At least one letter
                </li>
                <li className="flex items-center gap-2">
                  ✔ At least one number
                </li>
                <li className="flex items-center gap-2">
                  ✔ At least one special character
                </li>
              </ul>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-teal-300 text-white hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 h-10 px-4 py-2 has-[>svg]:px-3"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
