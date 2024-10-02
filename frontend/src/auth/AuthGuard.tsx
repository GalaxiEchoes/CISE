"use client";
import { validateClaim } from "@/lib/Auth";
import React, { useState, useEffect } from "react";

interface AuthGuardProps {
    children: React.ReactNode;
    roles: string[];
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ roles, children }) => {
    const [authorised, setAuthorised] = useState<boolean | null>(null); // null to handle loading state
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                setLoading(true);
                const result = await validateClaim(roles);
                setAuthorised(result);
                setLoading(false);
            } catch (error) {
                console.error("Error validating claim:", error);
                setAuthorised(false);
            }
        };
        checkAuthorization();
    }, [roles, authorised]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center align-middle">
                <p className="flex items-center gap-4">
                    <span className="text-2xl font-bold">{`Loading...`}</span>
                </p>
            </div>
        );
    }

    if (authorised === null || !authorised) {
        return (
            <div className="flex h-screen items-center justify-center align-middle">
                <p className="flex items-center gap-4">
                    <span className="text-2xl font-bold">{`401 |`}</span>
                    {`You are not authorised! lol`}
                </p>
            </div>
        );
    } else return <>{children}</>;
};
