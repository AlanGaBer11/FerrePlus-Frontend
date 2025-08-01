import WeatherCard from "@/components/WeatherCard";

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Bienvenido al Panel de Administración
      </h1>

      <div className="flex justify-center w-full my-6">
        <WeatherCard />
      </div>
      {/* Agregar mas tarjetas de información (Charts)*/}
    </div>
  );
};

export default DashboardHome;
