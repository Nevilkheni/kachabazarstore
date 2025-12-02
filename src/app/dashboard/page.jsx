import DashboardMain from "./maindashboard/page";
import Sidebar from "./sidebar/page";

export default function DashboardPage() {
  return (
    <div className=" flex max-w-[1535px] bg-white mx-auto px-3 sm:px-10">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div>
        <DashboardMain />
      </div>
    </div>
  );
}
