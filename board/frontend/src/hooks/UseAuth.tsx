import { useState, useEffect } from "react";
import { getCurrentUser, type AuthUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

export const useAuth = () => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                setUser(null);
            }
        };

        const listener = (data: any) => {
            switch (data.payload.event) {
                case "signedIn":
                    setLoading(true);
                    checkUser().finally(() => setLoading(false));
                    break;
                case "signedOut":
                    setUser(null);
                    break;
            }
        };

        const unsubscribe = Hub.listen("auth", listener);

        setLoading(true);
        checkUser().finally(() => setLoading(false));

        return unsubscribe;
    }, []);

    return { user, loading };
};
