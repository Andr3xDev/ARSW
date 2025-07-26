import { useState, useEffect } from "react";
import type { WeatherData } from "./components/WeatherDisplay";
import CityForm from "./components/CityForm";
import WeatherDisplay from "./components/WeatherDisplay";

function App() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [cityToSearch, setCityToSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!cityToSearch) return;

        const fetchWeatherData = async () => {
            setLoading(true);
            setError(null);
            setWeatherData(null);

            const apiKey = "83ec500b1d684130b61144058252207";
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityToSearch}&aqi=no`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.error.message ||
                            `HTTP error! status: ${response.status}`
                    );
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (e: any) {
                console.error("Error getting data:", e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [cityToSearch]);

    const handleSearch = (city: string) => {
        setCityToSearch(city);
    };

    return (
        <main className="bg-[#282828] min-h-screen w-full p-4 flex flex-col">
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold mb-8 text-white">
                        City Weather
                    </h1>
                    <div className="bg-[#282828] p-8 rounded-xl shadow-lg flex flex-col gap-10 items-center">
                        <CityForm onSearch={handleSearch} loading={loading} />
                    </div>
                </div>
                <WeatherDisplay
                    weatherData={weatherData}
                    loading={loading}
                    error={error}
                />
            </div>
            <footer className="text-center text-white py-4 mt-8">
                <p>By Andres Felipe Chavarro Plazas</p>
                <a
                    href="https://github.com/andres-felipe-chavarro-plazas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                >
                    GitHub Repository
                </a>
            </footer>
        </main>
    );
}

export default App;
