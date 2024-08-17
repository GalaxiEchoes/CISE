import React from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export const Nav: React.FC = () => {
    return (
        <div className="flex items-center gap-4">
            <h1>SPEED APP</h1>
            <Theme />
        </div>
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
