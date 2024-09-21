import { Article } from "@/models/Articles";
import { RegisterRequest } from "@/models/AccountRequests";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const apiGetArticles = async () => {
    try {
        return await apiGet(`/api/Article`);
    } catch (error) {
        throw error;
    }
};

export const apiGetArticleById = async (id: string) => {
    try {
        return await apiGet(`/api/Article/${id}`);
    } catch (error) {
        throw error;
    }
};

export const apiDeleteArticleById = async (id: string) => {
    try {
        return await apiDelete(`/api/Article/${id}`);
    } catch (error) {
        throw error;
    }
};

export const apiSubmitArticle = async (data: Article) => {
    try {
        return await apiPost(`/api/Article`, data);
    } catch (error) {
        throw error;
    }
};

export const apiValidateToken = async (idToken: any): Promise<any> => {
    try {
        const res = await fetch(`${API_URL}/api/Account/validateToken`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
            },
            credentials: "include",
        });
        if (!res.ok) return null;
        return res;
    } catch (error) {
        return false;
    }
};

export const apiLogout = async () => {
    try {
        return await apiGet(`/api/Account/logout`);
    } catch (error) {
        throw error;
    }
};

export const apiRegisterAccount = async (data: RegisterRequest) => {
    try {
        return await apiPost(`/api/Account/register`, data);
    } catch (error) {
        throw error;
    }
};

const apiGet = async (endpoint: string) => {
    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!res.ok) {
            return null;
        }

        return res;
    } catch (error) {
        // handle properly someday
        console.error(error);
    }
};

const apiPost = async (endpoint: string, data: any) => {
    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        return res;
    } catch (error) {
        // handle properly someday
        console.error(error);
    }
};

const apiDelete = async (endpoint: string) => {
    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "DELETE",
            headers: {},
            credentials: "include",
        });

        return res;
    } catch (error) {
        // handle properly someday
        console.error(error);
    }
};
