import { Article } from "@/models/Article";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CardArticleProps {
    article: Article;
}

export const CardArticle: React.FC<CardArticleProps> = ({ article }) => {
    return (
        <Card className="rounded-xl border">
            <CardHeader>
                <CardTitle>{`${article.title}`}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul>
                    <li>{`id: ${article.id}`}</li>
                    <li>{`authors: ${article.authors}`}</li>
                    <li>{`source: ${article.source}`}</li>
                    <li>{`pubyear: ${article.pubyear}`}</li>
                    <li>{`doi: ${article.doi}`}</li>
                    <li>{`claim: ${article.claim}`}</li>
                    <li>{`evidence: ${article.evidence}`}</li>
                </ul>
            </CardContent>
        </Card>
    );
};
