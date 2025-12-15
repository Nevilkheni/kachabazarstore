import { FiShoppingCart } from "react-icons/fi";
import { LuRefreshCw } from "react-icons/lu";
import { GrDeliver } from "react-icons/gr";
import { MdDone } from "react-icons/md";
import { IoBagHandleSharp } from "react-icons/io5";

export default function DashboardMain() {
  return (
    <div className=" w-full py-2 px-5 sm:px-12 lg:px-6  lg:py-8">
      <h1 className="text-xl font-sans font-medium text-black ">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 py-5">
        <div className="bg-white w-full border rounded-xl px-4 py-3 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ffc9c9] flex items-center justify-center">
            <FiShoppingCart className="text-[22px]  text-red-500" />
          </div>

          <div>
            <p className="text-gray-600 font-sans font-medium text-md">
              Total Orders
            </p>
            <h2 className="text-[20px] text-black font-bold">0</h2>
          </div>
        </div>

        <div className="bg-white w-full border rounded-xl px-4 py-3 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ffd7a8] flex items-center justify-center">
            <LuRefreshCw className="text-[22px]  text-red-500" />
          </div>

          <div>
            <p className="text-gray-600 font-sans font-medium text-md">
              Pending Orders
            </p>
            <h2 className="text-[20px] text-black font-bold">0</h2>
          </div>
        </div>
        <div className="bg-white w-full border rounded-xl px-4 py-3 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#c6d2ff] flex items-center justify-center">
            <GrDeliver className="text-[22px]  text-blue-500" />
          </div>

          <div>
            <p className="text-gray-600 font-sans font-medium text-md">
              Processing Order
            </p>
            <h2 className="text-[20px] text-black font-bold">0</h2>
          </div>
        </div>
        <div className="bg-white w-full border rounded-xl px-4 py-3 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#a4f4cf] flex items-center justify-center">
            <MdDone className="text-[22px]  text-green-500" />
          </div>

          <div>
            <p className="text-gray-600 font-sans font-medium text-md">
              Complete Orders
            </p>
            <h2 className="text-[20px] text-black font-bold">0</h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center  mt-18 text-center">
        <div className="flex items-center justify-center py-24">
          <IoBagHandleSharp className="text-emerald-500 text-6xl  " />
        </div>

        <p className="text-gray-500 text-md font-sans font-medium mt-4">
          You Have no order Yet!
        </p>
      </div>
    </div>
  );
}
