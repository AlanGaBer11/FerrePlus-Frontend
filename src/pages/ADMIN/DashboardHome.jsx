import WeatherCard from "@/components/admin/WeatherCard";
import LowStockCard from "@/components/admin/LowStockCrad";
import RecentMovementsCard from "@/components/admin/RecentMovementsCard";
import MovementsChart from "@/components/admin/MovementsChart";

const DashboardHome = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Panel de Administración</h1>

      <div
        className="flex justify-center w-full my-6"
        style={{ marginBottom: "2rem" }}
      >
        <WeatherCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LowStockCard />
        <RecentMovementsCard />
        <MovementsChart />
      </div>
    </div>
  );
};

export default DashboardHome;
