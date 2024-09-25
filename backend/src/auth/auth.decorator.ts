import { applyDecorators, UseGuards, SetMetadata } from "@nestjs/common";
import { AuthGuard } from "./auth.guard.ts";

export function Auth(...permissions: string[]) {
    return applyDecorators(
        SetMetadata("permissions", permissions),
        UseGuards(AuthGuard),
    );
}
