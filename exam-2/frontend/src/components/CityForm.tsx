import React, { useState } from "react";

interface CityFormProps {
    onSearch: (city: string) => void;
    loading: boolean;
}

const CityForm: React.FC<CityFormProps> = ({ onSearch, loading }) => {
    const [cityName, setCityName] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityName(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (cityName.trim()) {
            onSearch(cityName.trim());
        }
    };

    const inputStyles =
        "w-full p-3 bg-[#3c3c3c] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow";

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full max-w-md"
        >
            <input
                name="name"
                value={cityName}
                placeholder="City Name (e.g., Bogota, London)"
                onChange={handleChange}
                className={inputStyles}
                required
            />
            <button
                type="submit"
                disabled={loading}
                className="w-full p-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#282828] transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                {loading ? "Searching..." : "Search Weather"}
            </button>
        </form>
    );
};

export default CityForm;
