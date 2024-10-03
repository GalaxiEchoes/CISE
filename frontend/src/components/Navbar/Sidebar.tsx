"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import LogoutButton from "../Account/LogoutButton";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../Account/ThemeToggle";

export const Sidebar: React.FC = () => {
    const path = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    const displayName = localStorage.getItem("displayName");

    const paths = ["/", "/search", "/moderator", "/analyst", "/admin"];
    const prefix = ["/articles/"];

    if (!paths.includes(path) && !prefix.some((x) => path.startsWith(x))) {
        return null;
    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        width: isOpen ? "250px" : "0px",
                    }}
                    className="sidebar"
                >
                    {isOpen && (
                        <ul>
                            <li className="navHeader">
                                <Link href={"/"}>
                                    <h1>SPEED APP</h1>
                                </Link>
                            </li>
                            <li className="pb-2">
                                <ThemeToggle />
                            </li>
                            <li className="nav">
                                <Link href={"/articles/add"}>
                                    <h2>Submit Article</h2>
                                </Link>
                            </li>
                            <li className="nav">
                                <Link href={"/search"}>
                                    <h2>Search Article</h2>
                                </Link>
                            </li>
                            <li className="nav">
                                <Link href={"/moderator"}>
                                    <h2>Moderator Page</h2>
                                </Link>
                            </li>
                            <li className="nav">
                                <Link href={"/analyst"}>
                                    <h2>Analyst Page</h2>
                                </Link>
                            </li>
                            <li className="nav">
                                <Link href={"/admin"}>
                                    <h2>Admin Page</h2>
                                </Link>
                            </li>
                            <li className="pt-10">
                                <p className="font-bold">{displayName}</p>
                            </li>
                            <li className="pt-4">
                                <LogoutButton />
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            <div
                style={{
                    marginLeft: isOpen ? "250px" : "60px",
                    transition: "margin-left 0.5s",
                }}
            ></div>

            <button
                className="toggleButton"
                onClick={toggleSidebar}
                style={{
                    left: isOpen ? "186px" : "6px",
                }}
            >
                {isOpen ? (
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                )}
            </button>
        </>
    );
};

// export const Theme: React.FC = () => {
//     const { setTheme, theme } = useTheme();

//     const toggleTheme = () => {
//         if (theme === "light") setTheme("dark");
//         else setTheme("light");
//     };

//     return <Button onClick={toggleTheme}>Toggle Theme</Button>;
// };
