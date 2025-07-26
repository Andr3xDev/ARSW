import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import BoardPage from "./pages/BoardPage";
import { Login } from "./pages/LoginPage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<BoardPage />} />
            </Route>
        </Routes>
    );
};
