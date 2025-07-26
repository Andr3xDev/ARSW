import React from "react";
import PlayerListItem from "./PlayerListItem";

interface Player {
    id: string;
    name: string;
    isReady: boolean;
}

interface PlayerListProps {
    players: Player[];
    onPlayerReadyToggle: (playerId: string) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({
    players,
    onPlayerReadyToggle,
}) => {
    return (
        <div>
            <h3 className="text-2xl font-semibold mb-4">
                Players: ({players.length}/10)
            </h3>
            <div className="space-y-3">
                {players.map((player) => (
                    <PlayerListItem
                        key={player.id}
                        player={player}
                        onReadyToggle={onPlayerReadyToggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default PlayerList;
