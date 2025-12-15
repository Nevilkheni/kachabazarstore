import DashboardMain from "./maindashboard/page";
import Sidebar from "./sidebar/page";

export default function DashboardPage() {
  return (
    <div className=" flex lg:flex-row flex-col  max-w-[1536px] bg-white mx-auto px-3 lg:px-12 pb-5 ">
      <div className="w-full lg:w-2/5 xl:w-1/4  ">
        <Sidebar />
      </div>
      <div className="w-full lg:w-3/5 xl:w-3/4">
        <DashboardMain />
      </div>
    </div>
  );
}
