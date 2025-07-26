import React from "react";

interface Location {
    name: string;
    country: string;
    localtime: string;
}

interface Condition {
    icon: string;
    text: string;
}

interface Current {
    temp_c: number;
    condition: Condition;
}

interface WeatherData {
    location: Location;
    current: Current;
}

interface WeatherDisplayProps {
    weatherData: WeatherData | null;
    loading: boolean;
    error: string | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
    weatherData,
    loading,
    error,
}) => {
    if (loading) {
        return (
            <div className="mt-8 text-white text-lg">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-8 text-red-400 bg-red-900/50 p-4 rounded-lg">
                <p className="font-bold">Error:</p>
                <p>{error}</p>
            </div>
        );
    }

    if (!weatherData) {
        return (
            <div className="mt-8 text-gray-400">
                <p>Enter a city to get the current weather.</p>
            </div>
        );
    }

    const { location, current } = weatherData;

    return (
        <div className="mt-8 bg-[#3c3c3c] p-8 rounded-xl shadow-lg text-white w-full max-w-sm text-center">
            <h2 className="text-3xl font-bold">
                {location.name}, {location.country}
            </h2>
            <p className="text-gray-400 mb-4">{location.localtime}</p>
            <img
                src={current.condition.icon}
                alt={current.condition.text}
                className="w-24 h-24 mx-auto"
            />
            <p className="text-5xl font-semibold my-2">{current.temp_c}°C</p>
            <p className="text-xl capitalize">{current.condition.text}</p>
        </div>
    );
};

export default WeatherDisplay;
