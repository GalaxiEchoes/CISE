import { FirebaseApp, initializeApp } from "firebase/app";
import { apiRegisterAccount, apiLogout, apiValidateAuthorisation } from "./Api";
import { LoginRequest, RegisterRequest } from "@/models/AccountRequests";
import {
    Auth,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { tokenUtil, userUtil } from "./utils";

const app: FirebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

export const AUTH: Auth = getAuth(app);

export const registerService = async (
    req: RegisterRequest,
): Promise<boolean> => {
    try {
        const res = await apiRegisterAccount(req);
        const status = await res?.json();
        if (status?.status === 400) return false;
        else if (status?.statusCode === 400) return false;
        return true;
    } catch (error) {}
    return false;
};

export const loginService = async (req: LoginRequest): Promise<boolean> => {
    const { email, password } = req;
    try {
        const res = await signInWithEmailAndPassword(AUTH, email, password);
        const idToken = await res.user.getIdToken();
        const displayName = res?.user?.displayName ?? "";

        await fetch("/api/cookie/set-cookie", {
            method: "POST",
            body: JSON.stringify({ idToken: idToken }),
            cache: "no-cache",
        });

        tokenUtil.set(idToken);
        userUtil.set(displayName);
        return true;
    } catch (error) {}
    return false;
};

export const logoutService = async (): Promise<void> => {
    try {
        await signOut(AUTH);
        await apiLogout();
        await fetch("/api/cookie/rm-cookie", { cache: "no-cache" });
        tokenUtil.remove();
        userUtil.remove();
    } catch (error) {}
};

export const validateClaim = async (roles: string[]): Promise<boolean> => {
    try {
        const res = await apiValidateAuthorisation(roles);
        return await res?.json();
    } catch (error) {}
    return false;
};
