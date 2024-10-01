"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Article, DefaultEmptyArticle } from "../../models/Articles";
import { apiSubmitArticle } from "@/lib/Api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form";

const formSchema = z.object({
    title: z.string().min(1, "Title must be at least 1 character"),
    author: z.string().min(1, "Author must be at least 1 character"),
    source: z.string().min(1, "Source must be at least 1 character"),
    pubyear: z.string().regex(/^\d{4}$/, "Year must be a valid 4-digit number"),
    doi: z.string().min(1, "doi must be at least 1 characters"),
    claim: z.string().min(10, "Claim must be at least 10 characters"),
    evidence: z.string().min(10, "Evidence must be at least 10 characters"),
});

const SubmitArticle = () => {
    const navigate = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            author: "",
            source: "",
            pubyear: "",
            doi: "",
            claim: "",
            evidence: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const title = values.title;
        const authors = values.author;
        const source = values.source;
        const pubyear = values.pubyear;
        const doi = values.doi;
        const claim = values.claim;
        const evidence = values.evidence; // Make sure to extract the correct field for evidence

        const req: Article = {
            title,
            authors,
            source,
            pubyear,
            doi,
            claim,
            evidence,
        };

        try {
            const res = await apiSubmitArticle(req);
            const { success } = await res?.json();
            if (!success) {
                form.setError("title", {
                    type: "manual",
                    message:
                        "Submission unsuccessful. Please check the details entered.",
                });
            } else {
                form.clearErrors();
                navigate.push("/");
                navigate.refresh();
            }
        } catch (error) {}
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                                <Input placeholder="Author" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Source</FormLabel>
                            <FormControl>
                                <Input placeholder="Source" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pubyear"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                                <Input placeholder="Year" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="doi"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>DOI</FormLabel>
                            <FormControl>
                                <Input placeholder="DOI" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="claim"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Claim</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Claim" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="evidence"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Evidence</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Evidence" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};
export default SubmitArticle;
