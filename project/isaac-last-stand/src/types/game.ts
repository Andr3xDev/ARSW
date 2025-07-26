export interface GameEvents {
    PAUSE_GAME: "pause-game";
    RESUME_GAME: "resume-game";
    EXIT_GAME: "exit-game";
}

export interface PauseMenuState {
    isVisible: boolean;
    onResume: () => void;
    onExit: () => void;
}
