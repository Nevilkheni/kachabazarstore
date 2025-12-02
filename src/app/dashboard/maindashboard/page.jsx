import { FaShoppingCart } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { FaTruck } from "react-icons/fa6";
import { AiOutlineCheck } from "react-icons/ai";

export default function DashboardMain() {
  return (
    <div className=" w-full p-10">
      <h1 className="text-2xl font-semibold text-black mb-8">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Orders */}
        <div className="bg-white border rounded-xl px-6 py-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#ffe5e5] flex items-center justify-center">
            <FaShoppingCart className="text-[22px] text-red-500" />
          </div>

          <div>
            <p className="text-gray-600 text-sm">Total Orders</p>
            <h2 className="text-[20px] font-semibold">0</h2>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white border rounded-xl px-6 py-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#ffe8cc] flex items-center justify-center">
            <FiRefreshCcw className="text-[22px] text-orange-500" />
          </div>

          <div>
            <p className="text-gray-600 text-sm">Pending Orders</p>
            <h2 className="text-[20px] font-semibold">0</h2>
          </div>
        </div>

        {/* Processing Orders */}
        <div className="bg-white border rounded-xl px-6 py-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#ebe9ff] flex items-center justify-center">
            <FaTruck className="text-[22px] text-indigo-500" />
          </div>

          <div>
            <p className="text-gray-600 text-sm">Processing Order</p>
            <h2 className="text-[20px] font-semibold">0</h2>
          </div>
        </div>

        {/* Complete Orders */}
        <div className="bg-white border rounded-xl px-6 py-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#d8ffe8] flex items-center justify-center">
            <AiOutlineCheck className="text-[22px] text-green-600" />
          </div>

          <div>
            <p className="text-gray-600 text-sm">Complete Orders</p>
            <h2 className="text-[20px] font-semibold">0</h2>
          </div>
        </div>
      </div>

      {/* No orders */}
      <div className="flex flex-col items-center mt-32 text-center">
        <div className="w-20 h-20 bg-[#d8ffe8] rounded-full flex items-center justify-center">
          <FaShoppingCart className="text-green-600 text-4xl" />
        </div>

        <p className="text-gray-500 text-lg mt-4">You Have no order Yet!</p>
      </div>
    </div>
  );
}
