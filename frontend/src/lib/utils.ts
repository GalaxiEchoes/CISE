import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const userDataUtil = {
    set: (user: any) => {
        localStorage.setItem("user", JSON.stringify(user));
    },

    getToken: () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user).token : null;
    },

    remove: () => {
        localStorage.removeItem("user");
    },
};