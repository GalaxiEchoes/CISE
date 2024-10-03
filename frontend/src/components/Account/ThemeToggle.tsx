"use client";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC = () => {
    const { setTheme, theme } = useTheme();

    const toggleTheme = () => {
        if (theme === "light") setTheme("dark");
        else setTheme("light");
    };

    return (
        <Button onClick={toggleTheme} size={"icon"} variant={"secondary"}>
            {theme === "light" ? <Sun /> : <Moon />}
        </Button>
    );
};
