"use client";
import { RegisterRequest } from "@/models/AccountRequests";
import { registerService } from "@/lib/Auth";
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
    firstName: z
        .string()
        .min(1, "First name is required")
        .regex(
            /^[A-Za-z]+$/,
            "First name must contain only alphabetic characters",
        ),
    lastName: z
        .string()
        .min(1, "Last name is required")
        .regex(
            /^[A-Za-z]+$/,
            "Last name must contain only alphabetic characters",
        ),
    role: z.string().optional(),
});

export default function RegisterForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            role: "Standard User",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const email = values.email;
        const password = values.password;
        const firstName = values.firstName;
        const lastName = values.lastName;

        const req: RegisterRequest = {
            email,
            password,
            firstName,
            lastName,
        };

        try {
            const success = await registerService(req);
            if (!success) {
                form.setError("email", {
                    type: "manual",
                    message:
                        "Registration unsuccessful. Please use another email.",
                });
            } else {
                form.clearErrors();
                router.push("/account/login");
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
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                                <Input placeholder="First name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                                <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    disabled
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Input placeholder="Standard User" {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Register</Button>
            </form>
        </Form>
    );
}
