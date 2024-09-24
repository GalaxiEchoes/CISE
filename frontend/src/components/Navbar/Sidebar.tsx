"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

export const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
        <div style={{ display: 'flex' }}>
            <div
                style={{
                    width: isOpen ? '250px' : '0px',
                }}
                className="sidebar"
            >
                
                {isOpen && (
                    <ul>
                        <li className = "navHeader">
                            <Link href={"/"}>
                                <h1>SPEED APP</h1>
                            </Link>
                        </li>
                        <li className = "nav">
                            <Link href={"/articles/add"}>
                                <h2>Submit Article</h2>
                            </Link>
                        </li>
                        <li className = "nav">
                            <Link href={"/articles/add"}>
                                <h2>Submit 1</h2>
                            </Link>
                        </li>
                        <li className = "nav">
                            <Link href={"/articles/add"}>
                                <h2>Submit 2</h2>
                            </Link>
                        </li>
                        <li className = "nav">
                            <Link href={"/articles/add"}>
                                <h2>Submit 3</h2>
                            </Link>
                        </li>
                        <li>
                            <>
                                <Theme />
                            </>
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
            left: isOpen ? '186px' : '6px'
          }} >

          {isOpen ? (
            <svg className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
        </>     
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