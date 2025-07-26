import React, {
    createContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import {
    getCurrentUser,
    fetchUserAttributes,
    type AuthUser,
} from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

export interface AuthContextType {
    user: AuthUser | null;
    userName: string;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [userName, setUserName] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const updateUserState = async () => {
            try {
                const currentUser = await getCurrentUser();
                const attributes = await fetchUserAttributes();
                setUser(currentUser);
                setUserName(attributes.name || "");
            } catch (e) {
                console.error("Error updating user state:", e);
                setUser(null);
                setUserName("");
            }
        };

        const listener = (data: { payload: { event: string } }) => {
            switch (data.payload.event) {
                case "signedIn":
                    setLoading(true);
                    updateUserState().finally(() => setLoading(false));
                    break;
                case "signedOut":
                    setUser(null);
                    setUserName("");
                    break;
            }
        };

        const unsubscribe = Hub.listen("auth", listener);

        setLoading(true);
        updateUserState().finally(() => setLoading(false));

        return unsubscribe;
    }, []);

    const value = { user, userName, loading };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
