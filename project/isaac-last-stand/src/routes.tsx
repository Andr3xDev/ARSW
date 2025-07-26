import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import LobbyHub from "./pages/LobbyHub";
import { WebSocketProvider } from "./context/WebSocketContext";
import GameComponent from "./pages/Game";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/AuthPage";
import CreateLobbyPage from "./pages/CreateLobbyPage";

export const AppRoutes = () => {
    return (
        <WebSocketProvider>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-lobby" element={<CreateLobbyPage />} />
                    <Route path="/lobby" element={<Lobby />} />
                    <Route path="/lobby/:roomCode" element={<Lobby />} />
                    <Route path="/lobbyhub" element={<LobbyHub />} />
                    <Route path="/game/:gameId" element={<GameComponent />} />
                </Route>
            </Routes>
        </WebSocketProvider>
    );
};
