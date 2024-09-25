"use client";

import React from "react";
import { apiValidateToken } from "@/lib/Api";

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
            const res = await apiValidateToken("");
            setIsAuthenticated(await res.json());
            setIsLoading(false);
        }
        fetchAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
