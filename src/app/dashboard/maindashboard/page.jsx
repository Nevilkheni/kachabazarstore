<<<<<<< HEAD
// import { FiShoppingCart } from "react-icons/fi";
// import { LuRefreshCw } from "react-icons/lu";
// import { GrDeliver } from "react-icons/gr";
// import { MdDone } from "react-icons/md";
// import { IoBagHandleSharp } from "react-icons/io5";

// export default function DashboardMain() {
//   return (
//     <div className=" w-full py-2 px-5 sm:px-12 lg:px-6  lg:py-8">
//       <h1 className="text-xl font-sans font-medium text-black ">Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 py-5">
//         <div className="bg-white w-full border rounded-xl px-4 py-3 flex items-center gap-4">
//           <div className="w-12 h-12 rounded-full bg-[#ffc9c9] flex items-center justify-center">
//             <FiShoppingCart className="text-[22px]  text-red-500" />
//           </div>

//           <div>
//             <p className="text-gray-600 font-sans font-medium text-md">
//               Total Orders
//             </p>
//             <h2 className="text-[20px] text-black font-bold">0</h2>
//           </div>
//         </div>

//         <div className="bg-white w-full border rounded-xl px-4 py-3 flex items-center gap-4">
//           <div className="w-12 h-12 rounded-full bg-[#ffd7a8] flex items-center justify-center">
//             <LuRefreshCw className="text-[22px]  text-red-500" />
//           </div>

//           <div>
//             <p className="text-gray-600 font-sans font-medium text-md">
//               Pending Orders
//             </p>
//             <h2 className="text-[20px] text-black font-bold">0</h2>
//           </div>
//         </div>
//         <div className="bg-white w-full border rounded-xl px-4 py-3 flex items-center gap-4">
//           <div className="w-12 h-12 rounded-full bg-[#c6d2ff] flex items-center justify-center">
//             <GrDeliver className="text-[22px]  text-blue-500" />
//           </div>

//           <div>
//             <p className="text-gray-600 font-sans font-medium text-md">
//               Processing Order
//             </p>
//             <h2 className="text-[20px] text-black font-bold">0</h2>
//           </div>
//         </div>
//         <div className="bg-white w-full border rounded-xl px-4 py-3 flex items-center gap-4">
//           <div className="w-12 h-12 rounded-full bg-[#a4f4cf] flex items-center justify-center">
//             <MdDone className="text-[22px]  text-green-500" />
//           </div>

//           <div>
//             <p className="text-gray-600 font-sans font-medium text-md">
//               Complete Orders
//             </p>
//             <h2 className="text-[20px] text-black font-bold">0</h2>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col items-center  mt-18 text-center">
//         <div className="flex items-center justify-center py-24">
//           <IoBagHandleSharp className="text-emerald-500 text-6xl  " />
//         </div>

//         <p className="text-gray-500 text-md font-sans font-medium mt-4">
//           You Have no order Yet!
//         </p>
//       </div>
//     </div>
//   );
// }




=======
>>>>>>> 4d3a92ceb66327c8e7bc3cc619b3677a47ab2d9d
"use client";
import { FiShoppingCart } from "react-icons/fi";
import { LuRefreshCw } from "react-icons/lu";
import { GrDeliver } from "react-icons/gr";
import { MdDone } from "react-icons/md";
import MyOrdersPage from "../my-orders/page";
import { useState, useEffect } from "react";

export default function DashboardMain() {
  const [loading, setLoading] = useState(true);
  const [orderStats, setOrderStats] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/my-orders?limit=1000`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        const fetchedOrders = data.orders || [];

        const stats = {
          total: fetchedOrders.length,
          pending: fetchedOrders.filter(order => order.status === 'pending').length,
          processing: fetchedOrders.filter(order => order.status === 'processing' || order.status === 'confirm').length,
          completed: fetchedOrders.filter(order => order.status === 'completed' || order.status === 'delivered').length
        };
        setOrderStats(stats);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrderStats({
          total: 0,
          pending: 0,
          processing: 0,
          completed: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="w-full py-2 px-5 sm:px-12 lg:px-6 lg:py-8">
      <h1 className="text-xl font-sans font-medium text-black">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 py-5">
        <div className="bg-[#f9fafb] w-full border rounded-xl px-4 py-3 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ffc9c9] flex items-center justify-center">
            <FiShoppingCart className="text-[22px] text-red-500" />
          </div>
          <div>
            <p className="text-gray-600 font-sans font-medium text-md">
              Total Orders
            </p>
            <h2 className="text-[20px] text-black font-bold">
              {loading ? "..." : orderStats.total}
            </h2>
          </div>
        </div>

        <div className="bg-[#f9fafb] w-full border rounded-xl px-4 py-3 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ffd7a8] flex items-center justify-center">
            <LuRefreshCw className="text-[22px] text-orange-500" />
          </div>
          <div>
            <p className="text-gray-600 font-sans font-medium text-md">
              Pending Orders
            </p>
            <h2 className="text-[20px] text-black font-bold">
              {loading ? "..." : orderStats.pending}
            </h2>
          </div>
        </div>

        <div className="bg-[#f9fafb] w-full border rounded-xl px-4 py-3 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#c6d2ff] flex items-center justify-center">
            <GrDeliver className="text-[22px] text-blue-500" />
          </div>
          <div>
            <p className="text-gray-600 font-sans font-medium text-md">
              Processing Order
            </p>
            <h2 className="text-[20px] text-black font-bold">
              {loading ? "..." : orderStats.processing}
            </h2>
          </div>
        </div>

        <div className="bg-[#f9fafb] w-full border rounded-xl px-4 py-3 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#a4f4cf] flex items-center justify-center">
            <MdDone className="text-[22px] text-green-500" />
          </div>
          <div>
            <p className="text-gray-600 font-sans font-medium text-md">
              Complete Orders
            </p>
            <h2 className="text-[20px] text-black font-bold">
              {loading ? "..." : orderStats.completed}
            </h2>
          </div>
        </div>
      </div>
      <h1 className="text-lg font-semibold mt-3 mb-8 text-black">Recent Orders </h1>

      <MyOrdersPage />
    </div>
  );
}