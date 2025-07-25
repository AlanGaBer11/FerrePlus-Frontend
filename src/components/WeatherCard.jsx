import React, { useEffect, useState } from "react";
import ToastService from "@/services/toast/ToastService";
// UI
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const city = "Aguascalientes";

  useEffect(() => {
    const fetchWeather = async () => {
      if (!apiKey) {
        console.error("API key no encontrada");
        ToastService.error("Error: API key no configurada");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${apiKey}`
        );
        if (!res.ok) {
          throw new Error("Error al obtener datos del clima");
        }
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Error al obtener el clima:", error);
        ToastService.error("Error al cargar datos del clima");
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [apiKey]);

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex items-center justify-center p-6">
          <p>Cargando clima...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md border-red-200">
        <CardContent className="p-6">
          <p className="error-text">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="w-[800px] bg-gradient-to-br from-blue-50 to-sky-100 border-sky-200">
      <CardHeader className="text-center py-2">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Clima en {city}
        </CardTitle>
        <CardDescription className="text-gray-600 capitalize">
          {weather.weather[0].description}
        </CardDescription>
      </CardHeader>

      <CardContent className="text-center py-2">
        <div className="flex items-center justify-center space-x-6">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Icono del clima"
            className="w-16 h-16"
          />
          <div className="text-4xl font-bold text-gray-800">
            {Math.round(weather.main.temp)}°C
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 text-sm text-gray-600 mt-4">
          <div className="text-center">
            <p className="font-medium">Sensación térmica</p>
            <p>{Math.round(weather.main.feels_like)}°C</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Humedad</p>
            <p>{weather.main.humidity}%</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Presión</p>
            <p>{weather.main.pressure} hPa</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Viento</p>
            <p>{weather.wind?.speed || 0} m/s</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
