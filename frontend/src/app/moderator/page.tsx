import { AuthGuardModerator } from "@/auth/AuthGuard";
import ModeratorTable from "@/components/Articles/moderator/ModeratorTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ModeratorPage() {
    return (
        <AuthGuardModerator>
            <Card>
                <CardHeader>
                    <CardTitle>Moderator Page</CardTitle>
                </CardHeader>
                <CardContent>
                    <ModeratorTable />
                </CardContent>
            </Card>
        </AuthGuardModerator>
    );
}
