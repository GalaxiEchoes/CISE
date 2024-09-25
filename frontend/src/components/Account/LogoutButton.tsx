"use client";
import { logoutService } from "@/lib/Auth";
import { Button } from "../ui/button";

export default function LogoutButton() {
    const handleSubmit = async () => {
        try {
            await logoutService();
            window.location.reload();
        } catch (error) {}
    };

    return (
        <Button className="w-20" onClick={handleSubmit}>
            Logout
        </Button>
    );
}
