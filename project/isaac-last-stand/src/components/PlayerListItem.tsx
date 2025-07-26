import React from "react";

interface Player {
    id: string;
    name: string;
    isReady: boolean;
}

interface PlayerListItemProps {
    player: Player;
    onReadyToggle: (playerId: string) => void;
}

const PlayerListItem: React.FC<PlayerListItemProps> = ({
    player,
    onReadyToggle,
}) => {
    const isHost = player.name.includes("Host");

    return (
        <div
            onClick={() => !isHost && onReadyToggle(player.id)}
            className={`flex items-center justify-between p-4 rounded-lg bg-[#090909] border border-[#402120] shadow-md transition-all duration-200 ${
                !isHost ? "cursor-pointer " : "cursor-default"
            }`}
        >
            <span className="font-medium text-lg text-slate-200">
                {player.name}
            </span>
            {player.isReady ? (
                <span className="font-bold text-emerald-400 bg-emerald-900/50 px-3 py-1 rounded-full text-sm">
                    ✔️ Ready
                </span>
            ) : (
                <span className="font-bold text-amber-400 bg-amber-900/50 px-3 py-1 rounded-full text-sm">
                    ⏳ Not Ready
                </span>
            )}
        </div>
    );
};

export default PlayerListItem;
