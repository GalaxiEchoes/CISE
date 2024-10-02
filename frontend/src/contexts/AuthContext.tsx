"use client";

import React from "react";
import { apiValidateToken, apiValidateAuthorisation } from "@/lib/Api";
import { tokenUtil } from "@/lib/utils";
import { logoutService } from "@/lib/Auth";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true,
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchAuthStatus() {
            console.log("running from AuthContext.tsx");
            const res = await apiValidateToken();
            const auth = await res?.json();
            setIsAuthenticated(auth);
            if (!auth) {
                await logoutService();
            }
            setIsLoading(false);
        }
        fetchAuthStatus();
    }, []);

    const values = { isAuthenticated, isLoading };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};
