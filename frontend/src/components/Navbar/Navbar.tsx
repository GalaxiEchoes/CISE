"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import Link from "next/link";

export const Navbar: React.FC = () => {
    return (
        <nav className="border-b-[1px] border-[#aaa] border-dotted pb-2">
            <ul className="flex items-center gap-4">
                <li>
                    <Link href={"/"}>
                        <h1>SPEED APP</h1>
                    </Link>
                </li>
                <li>
                    <Link href={"/articles/add"}>
                        <Button>Submit Article</Button>
                    </Link>
                </li>
                <li>
                    <Theme />
                </li>
                <li className="ml-auto">
                    <Link href={"/search"}>
                        <Button>Search</Button>
                    </Link>
                </li>
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
