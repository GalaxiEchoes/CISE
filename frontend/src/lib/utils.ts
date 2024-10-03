import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const tokenUtil = {
    set: (idToken: string) => {
        localStorage.setItem("idToken", idToken);
    },

    get: () => {
        return localStorage?.getItem("idToken");
    },

    remove: () => {
        localStorage.removeItem("idToken");
    },
};

export const userUtil = {
    set: (displayName: string) => {
        localStorage.setItem("displayName", displayName);
    },

    get: () => {
        return localStorage?.getItem("displayName");
    },

    remove: () => {
        localStorage.removeItem("displayName");
    },
};