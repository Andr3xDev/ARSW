import { useState } from "react";
import { Canvas } from "../components/Canvas";
import { Toolbar } from "../components/Toolbar";

export default function BoardPage() {
    const [color, setColor] = useState("#000000");
    const [strokeWeight, setStrokeWeight] = useState(4);

    return (
        <div className="flex">
            <div className="w-1/4 h-screen flex flex-col bg-[#1b1b1b] p-6 border-r border-[#1d3339] justify-center items-center">
                <div className="flex justify-center mb-6">
                    <img
                        src="../../assets/logo.png"
                        alt="Logo"
                        className="h-35 w-auto"
                    />
                </div>
                <h1 className="flex text-2xl font-bold text-white mb-6">
                    --Boardes--
                </h1>
                <div className="w-full">
                    <Toolbar
                        color={color}
                        setColor={setColor}
                        strokeWeight={strokeWeight}
                        setStrokeWeight={setStrokeWeight}
                    />
                </div>
            </div>

            <div className="flex-grow flex items-center justify-center p-6 bg-[#282828]">
                <Canvas color={color} strokeWeight={strokeWeight} />
            </div>
        </div>
    );
}
