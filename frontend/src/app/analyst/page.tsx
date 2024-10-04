import { AuthGuardAnalyst } from "@/auth/AuthGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalystPage() {
    return (
        <AuthGuardAnalyst>
            <Card>
                <CardHeader>
                    <CardTitle>Analyst Page</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Analyst Table</p>
                </CardContent>
            </Card>
        </AuthGuardAnalyst>
    );
}
