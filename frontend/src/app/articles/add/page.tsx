import SubmitArticle from "@/components/Articles/SubmitArticle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddArticle() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Card className="w-[100%] rounded-lg shadow-xl sm:m-8 lg:m-20 xl:m-72 2xl:m-96">
                <CardHeader>
                    <CardTitle>Submit Article</CardTitle>
                </CardHeader>
                <CardContent>
                    <SubmitArticle />
                </CardContent>
            </Card>
        </div>
    );
}
