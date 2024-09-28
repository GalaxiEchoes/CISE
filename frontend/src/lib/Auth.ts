import { FirebaseApp, initializeApp } from "firebase/app";
import { apiRegisterAccount, apiLogout } from "./Api";
import { LoginRequest, RegisterRequest } from "@/models/AccountRequests";
import {
    Auth,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { userDataUtil } from "./utils";

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
        const userData = {
            uid: res.user.uid,
            email: res.user.email,
            idToken: await res.user.getIdToken(),
        };
        userDataUtil.set(userData);
        return true;
    } catch (error) {}
    return false;
};

export const logoutService = async (): Promise<void> => {
    try {
        await signOut(AUTH);
        await apiLogout();
        userDataUtil.remove();
    } catch (error) {}
};
