import LoginForm from "@/components/Account/LoginForm";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
    CardDescription,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/Account/ThemeToggle";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex h-full w-full justify-center">
            <Card className="m-20 w-96 rounded-lg p-10 shadow-xl">
                <div className="flex justify-end">
                    <ThemeToggle />
                </div>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter>
                    <CardDescription>
                        {`Don't have an account? Register `}
                        <Link href="/account/register" className="text-primary">
                            here.
                        </Link>
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    );
}
