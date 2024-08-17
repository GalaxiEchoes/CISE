"use client";
import { useParams } from "next/navigation";

export default function EditArticle() {
    const { id } = useParams();
    return <div>{`Editing article page ${id}`}</div>;
}
