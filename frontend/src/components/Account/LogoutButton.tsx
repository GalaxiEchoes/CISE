"use client";
import { logoutService } from "@/lib/Auth";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            await logoutService();
            router.push("/");
            router.refresh();
        } catch (error) {}
    };

    return (
        <Button className="w-20" onClick={handleSubmit}>
            Logout
        </Button>
    );
}
