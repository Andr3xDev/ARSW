import { useState, useRef, useEffect } from "react";

interface ToolbarProps {
    color: string;
    setColor: (color: string) => void;
    strokeWeight: number;
    setStrokeWeight: (weight: number) => void;
}

export function Toolbar({
    color,
    setColor,
    strokeWeight,
    setStrokeWeight,
}: Readonly<ToolbarProps>) {
    const [isErasing, setIsErasing] = useState(false);
    const colorBeforeErasingRef = useRef(color);

    useEffect(() => {
        if (isErasing) {
            if (color !== "#FFFFFF") {
                setIsErasing(false);
            }
        } else {
            colorBeforeErasingRef.current = color;
        }
    }, [color, isErasing]);

    const handleToggleEraser = () => {
        if (isErasing) {
            setColor(colorBeforeErasingRef.current);
            setIsErasing(false);
        } else {
            setColor("#FFFFFF");
            setIsErasing(true);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                {" "}
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Color{" "}
                </label>{" "}
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-10 p-1 bg-gray-700 border border-gray-600 rounded-md cursor-pointer"
                />{" "}
            </div>{" "}
            <div>
                {" "}
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Thickness: {strokeWeight}px{" "}
                </label>{" "}
                <input
                    type="range"
                    min="1"
                    max="50"
                    value={strokeWeight}
                    onChange={(e) => setStrokeWeight(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />{" "}
            </div>
            <button
                onClick={handleToggleEraser}
                className={`w-full mt-4 px-4 py-2 font-semibold rounded-md transition-colors ${
                    isErasing
                        ? "bg-[#376349]  text-white"
                        : "bg-[#275359] text-gray-200"
                }`}
            >
                {isErasing ? "Brush" : "Eraser"}
            </button>{" "}
        </div>
    );
}
