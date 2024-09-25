import { FirebaseApp, initializeApp } from "firebase/app";
import { apiRegisterAccount, apiLogin, apiLogout } from "./Api";
import { LoginRequest, RegisterRequest } from "@/models/AccountRequests";
import {
    Auth,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

const app: FirebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

export const AUTH: Auth = getAuth(app);

export const loginService = async (req: LoginRequest): Promise<boolean> => {
    const { email, password } = req;
    try {
        const res = await signInWithEmailAndPassword(AUTH, email, password);
        if (res.user) {
            const idToken = await res.user.getIdToken();
            await apiLogin(idToken);
            localStorage.setItem("idToken", idToken);
            return true;
        }
    } catch (error) {}
    return false;
};

export const logoutService = async (): Promise<void> => {
    try {
        await signOut(AUTH);
        await apiLogout();
    } catch (error) {}
};

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
