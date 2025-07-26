import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

export const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Checking session...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
