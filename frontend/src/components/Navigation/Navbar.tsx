"use client";

import React from "react";
import { useTheme } from "next-themes";
import LogoutButton from "../Account/LogoutButton";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <nav>
                <ul className="flex items-center gap-4">
                    <li>
                        <Link href={"/"}>
                            <h1>SPEED APP</h1>
                        </Link>
                    </li>
                    <li>
                        <Theme />
                    </li>
                    <li>
                        <Link href={"/articles/add"}>
                            <Button>Submit Article</Button>
                        </Link>
                    </li>
                    <li>
                        <Button className="w-20"></Button>
                    </li>
                </ul>
            </nav>
        );
    }

    return (
        <nav>
            <ul className="flex items-center gap-4">
                <li>
                    <Link href={"/"}>
                        <h1>SPEED APP</h1>
                    </Link>
                </li>
                <li>
                    <Theme />
                </li>
                <li>
                    <Link href={"/articles/add"}>
                        <Button>Submit Article</Button>
                    </Link>
                </li>
                {!isAuthenticated && (
                    <>
                        <li>
                            <Link href="/account/login">
                                <Button className="w-20">Login</Button>
                            </Link>
                        </li>
                    </>
                )}
                {isAuthenticated && (
                    <li>
                        <LogoutButton />
                    </li>
                )}
            </ul>
        </nav>
    );
};

const Theme: React.FC = () => {
    const { setTheme, theme } = useTheme();

    const toggleTheme = () => {
        if (theme === "light") setTheme("dark");
        else setTheme("light");
    };

    return <Button onClick={toggleTheme}>Toggle Theme</Button>;
};
