import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ContextTheme } from "@/contexts/ContextTheme";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/Navbar/Sidebar";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "SPEED App",
    description: "Software Practice Empirical Evidence Database",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased p-2",
                    fontSans.variable,
                )}
            >
                <ContextTheme
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className = "sideNav">
                        <Sidebar />
                        <main className = "mainContent">
                            {children}
                        </main>
                    </div>
                </ContextTheme>
            </body>
        </html>
    );
}
