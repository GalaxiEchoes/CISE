"use client";
import { LoginRequest } from "@/models/AccountRequests";
import { loginService } from "@/lib/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const email = values.email;
        const password = values.password;

        const req: LoginRequest = {
            email,
            password,
        };

        try {
            const success = await loginService(req);
            if (!success) {
                form.setError("email", {
                    type: "manual",
                    message:
                        "Login unsuccessful. Please check your credentials.",
                });
                form.setError("password", {
                    type: "manual",
                    message:
                        "Login unsuccessful. Please check your credentials.",
                });
            } else {
                form.clearErrors();
                window.location.reload();
            }
        } catch (error) {}
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="user@speedapp.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Login</Button>
            </form>
        </Form>
    );
}
