import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthGuardAdmin } from "@/auth/AuthGuard";
import ShowArticlesList from "@/components/Articles/ShowArticleList";
import { ArticleAdminCard } from "@/components/Articles/ArticleAdminCard";

export default function AdminPage() {
    return (
        <AuthGuardAdmin>
            <Card>
                <CardHeader>
                    <CardTitle>Admin Page</CardTitle>
                </CardHeader>
                <CardContent>
                    <ShowArticlesList CardComponent={ArticleAdminCard} />
                </CardContent>
            </Card>
        </AuthGuardAdmin>
    );
}
