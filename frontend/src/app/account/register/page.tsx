import RegisterForm from "@/components/Account/RegisterForm";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
    CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="flex h-full w-full justify-center">
            <Card className="m-20 w-96 rounded-lg p-10 shadow-xl">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
                <CardFooter>
                    <CardDescription>
                        Already have an account? Login{" "}
                        <Link href="/account/login" className="text-primary">
                            here.
                        </Link>
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    );
}
