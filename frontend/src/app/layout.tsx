import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ContextTheme } from "@/contexts/ContextTheme";
import { AuthProvider } from "@/contexts/AuthContext";
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
                    "bg-background font-sans antialiased",
                    fontSans.variable,
                )}
            >
                <AuthProvider>
                    <ContextTheme
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="sideNav">
                            <Sidebar />
                            <main className="mainContent">{children}</main>
                        </div>
                    </ContextTheme>
                </AuthProvider>
            </body>
        </html>
    );
}
