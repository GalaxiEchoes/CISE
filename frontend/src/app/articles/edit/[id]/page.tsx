import UpdateArticleInfo from "@/components/Articles/UpdateArticleInfo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthGuardAdmin } from "@/auth/AuthGuard";

export default function EditArticle() {
    return (
        <AuthGuardAdmin>
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
        </AuthGuardAdmin>
    );
}
