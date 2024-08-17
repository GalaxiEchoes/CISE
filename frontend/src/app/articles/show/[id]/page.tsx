"use client";
import { useParams } from "next/navigation";

export default function ShowArticle() {
    const { id } = useParams();
    return <div>{`Showing article page ${id}`}</div>;
}
