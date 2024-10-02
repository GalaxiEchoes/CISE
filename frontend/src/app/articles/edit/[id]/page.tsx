import UpdateArticleInfo from "@/components/Articles/UpdateArticleInfo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthGuard } from "@/auth/AuthGuard";
import { authorisation } from "@/auth/AuthRoles";

export default function EditArticle() {
    return (
        <AuthGuard roles={authorisation.admin}>
            <div className="flex h-screen w-full items-center justify-center">
                <Card className="w-[100%] rounded-lg shadow-xl sm:m-8 lg:m-20 xl:m-72 2xl:m-96">
                    <CardHeader>
                        <CardTitle>Edit Article</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UpdateArticleInfo />
                    </CardContent>
                </Card>
            </div>
        </AuthGuard>
    );
}
