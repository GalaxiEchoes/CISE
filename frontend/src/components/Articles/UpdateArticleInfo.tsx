"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Article, DefaultEmptyArticle } from "../../models/Articles";
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
    authors: z.string().min(1, "Author must be at least 1 character"),
    source: z.string().min(1, "Source must be at least 1 character"),
    pubyear: z.string().regex(/^\d{4}$/, "Year must be a valid 4-digit number"),
    doi: z.string().min(1, "doi must be at least 1 characters"),
    claim: z.string().min(10, "Claim must be at least 10 characters"),
    evidence: z.string().min(10, "Evidence must be at least 10 characters"),
});

function UpdateArticleInfo() {
    const id = useParams<{ id: string }>().id;
    const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            authors: "",
            source: "",
            pubyear: "",
            doi: "",
            claim: "",
            evidence: "",
        },
    });

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/article/${id}`)
            .then((res) => res.json())
            .then((json) => {
                setArticle(json);
                form.reset({
                    title: json.title,
                    authors: json.authors || "",
                    source: json.source || "",
                    pubyear: json.pubyear || "",
                    doi: json.doi || "",
                    claim: json.claim || "",
                    evidence: json.evidence || "",
                });
            })
            .catch((err) => {
                console.log("Error from UpdateArticleInfo: " + err);
            });
    }, [id, form]);

    const onCancel = () => {
        form.clearErrors();
        router.push(`/articles/show/${id}`);
        router.refresh();
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const title = values.title;
        const authors = values.authors;
        const source = values.source;
        const pubyear = values.pubyear;
        const doi = values.doi;
        const claim = values.claim;
        const evidence = values.evidence;

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
            const res = await fetch(
                process.env.NEXT_PUBLIC_BACKEND_URL + `/api/article/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(req),
                },
            );

            const jsonResponse = await res.json();
            const { success } = jsonResponse;

            if (!success) {
                form.setError("title", {
                    type: "manual",
                    message:
                        "Edit unsuccessful. Please check the details entered.",
                });
            } else {
                form.clearErrors();
                router.push(`/articles/show/${id}`);
                router.refresh();
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
                    name="authors"
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
                <Button type="submit">Update</Button>
                <Button type="button" variant={"outline"} onClick={onCancel}>
                    Cancel
                </Button>
            </form>
        </Form>
    );
}
export default UpdateArticleInfo;
