import { AuthGuardAnalyst } from "@/auth/AuthGuard";
import AnalystTable from "@/components/Articles/analyst/AnalystTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalystPage() {
    return (
        <AuthGuardAnalyst>
            <Card>
                <CardHeader>
                    <CardTitle>Analyst Page</CardTitle>
                </CardHeader>
                <CardContent>
                    <AnalystTable />
                </CardContent>
            </Card>
        </AuthGuardAnalyst>
    );
}
