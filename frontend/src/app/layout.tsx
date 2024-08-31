import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ContextTheme } from "@/contexts/ContextTheme";
import { cn } from "@/lib/utils";
import BootstrapClient from "@/components/BootstrapClient";

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
                className={fontSans.className}>
                <BootstrapClient />
                {children}
            </body>
        </html>
    );
}
