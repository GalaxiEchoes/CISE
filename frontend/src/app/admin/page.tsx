import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthGuardAdmin } from "@/auth/AuthGuard";

export default function AdminPage() {
    return (
        <AuthGuardAdmin>
            <Card>
                <CardHeader>
                    <CardTitle>Admin Page</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Admin Table</p>
                </CardContent>
            </Card>
        </AuthGuardAdmin>
    );
}
