import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/container.css";
import { signOut } from "aws-amplify/auth";

function Home() {
    const navigate = useNavigate();
    const [playerName] = useState(
        sessionStorage.getItem("userName") || "Guest"
    );

    const handleCreateLobby = () => {
        sessionStorage.setItem("playerName", playerName);
        sessionStorage.removeItem("currentLobby");
        navigate("/create-lobby");
    };

    const handleLogOut = async () => {
        try {
            await signOut();
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Error al cerrar la sesión en Cognito: ", error);
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-start">
            <div className="w-2/5 flex flex-col items-center">
                <img
                    src="/src/assets/title.png"
                    alt="Logo game"
                    className="w-full my-6"
                />
                <div className="container-menu w-11/13 flex-col flex gap-4 justify-center">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white text-center">
                            Let's play {playerName}!
                        </h2>
                    </div>
                    <button
                        onClick={handleCreateLobby}
                        className="text-xl cursor-pointer bg-[#C15328] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-[#B1361E] transition-all duration-200"
                    >
                        Create Lobby
                    </button>
                    <button
                        onClick={() => navigate("/lobbyhub")}
                        className="text-xl cursor-pointer bg-[#C15328] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-[#B1361E] transition-all duration-200"
                    >
                        Join Lobby
                    </button>
                    <div className="flex justify-center items-center gap-4">
                        <button
                            onClick={() => navigate("/lobbyhub")}
                            className="w-full text-xl cursor-pointer bg-[#C15328] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-[#B1361E] transition-all duration-200"
                        >
                            Ranking
                        </button>
                        <button
                            onClick={handleLogOut}
                            className="w-full text-xl cursor-pointer bg-[#C15328] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-[#B1361E] transition-all duration-200"
                        >
                            LogOut
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
