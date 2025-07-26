import React from "react";

export interface Room {
    id: string;
    name: string;
    players: number;
}

interface PublicRoomItemProps {
    room: Room;
    onJoin: () => void;
}

const PublicRoomItem: React.FC<PublicRoomItemProps> = ({ room, onJoin }) => {
    const isFull = room.players >= 10;

    return (
        <div className="flex items-center justify-between bg-slate-800 p-4 rounded-lg border border-slate-700 hover:bg-slate-700/50 transition-colors">
            <div>
                <h3 className="font-bold text-slate-100">{room.name}</h3>
                <span className="text-sm text-slate-400">
                    Players: {room.players} / 12
                </span>
            </div>
            <button
                onClick={onJoin}
                disabled={isFull}
                className="bg-slate-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-slate-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
            >
                {isFull ? "Full" : "Join"}
            </button>
        </div>
    );
};

export default PublicRoomItem;
