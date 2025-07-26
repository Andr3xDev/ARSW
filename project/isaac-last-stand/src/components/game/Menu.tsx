import React from "react";

interface PauseMenuProps {
    onResume: () => void;
    onQuit: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ onResume, onQuit }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-gray-900 text-white rounded-lg p-6 shadow-lg w-80 space-y-4 text-center">
                <h2 className="text-2xl font-bold">Game Paused</h2>
                <button
                    onClick={onResume}
                    className="w-full py-2 bg-green-600 hover:bg-green-700 rounded transition"
                >
                    Resume
                </button>
                <button
                    onClick={onQuit}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 rounded transition"
                >
                    Quit to Menu
                </button>
            </div>
        </div>
    );
};

export default PauseMenu;
