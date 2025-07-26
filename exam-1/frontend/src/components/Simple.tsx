import React, { useState } from "react";
import axios from "axios";

interface RequestData {
    name: string;
    type: string;
}

interface FormProps {
    onSearch: () => void;
}

export default function MarketForm({
    onSearch,
}: Readonly<FormProps>) {
    const [formData, setFormData] = useState<RequestData>({
        name: "",
        type: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/users", formData);
            onSearch();
        } catch (error) {
            console.error("Error al guardar el estudiante:", error);
        }
    };

    const inputStyles =
        "w-full p-3 bg-[#3c3c3c] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-96">
            <label>
                Name
            </label>
            <input
                name="name"
                value={formData.name}
                placeholder="Company name / symbol"
                onChange={handleChange}
                className={inputStyles}
                required
            />{" "}
            <label className="mt-5">
                Type of query
            </label>
            <input
                name="type"
                value={formData.type}
                placeholder="type"
                onChange={handleChange}
                className={inputStyles}
                required
            />{" "}
            <button
                type="submit"
                className="w-full p-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#282828] transition-colors"
            >
                Search info{" "}
            </button>{" "}
        </form>
    );
}