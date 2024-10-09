import { AuthGuardModerator } from "@/auth/AuthGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ModeratorPage() {
    return (
        <AuthGuardModerator>
            <Card>
                <CardHeader>
                    <CardTitle>Moderator Page</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Moderator Table</p>
                </CardContent>
            </Card>
        </AuthGuardModerator>
    );
}
