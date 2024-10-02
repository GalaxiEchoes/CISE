import { Article } from "@/models/Articles";
import { RegisterRequest } from "@/models/AccountRequests";
import { tokenUtil } from "./utils";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

/**
 * @Articles
 */
export const apiGetArticles = async () => {
    return await apiGet(`/api/Article`);
};

export const apiGetArticleById = async (id: string) => {
    return await apiGet(`/api/Article/${id}`);
};

export const apiDeleteArticleById = async (id: string) => {
    return await apiDelete(`/api/Article/${id}`);
};

export const apiSubmitArticle = async (data: Article) => {
    return await apiPost(`/api/Article`, data);
};

export const apiUpdateArticle = async (id: string, data: Article) => {
    return await apiPut(`/api/Article/${id}`, data);
};

/**
 * @Account
 */
export const apiRegisterAccount = async (data: RegisterRequest) => {
    return await apiPost(`/api/Account/register`, data);
};

export const apiLogout = async () => {
    return await apiGet(`/api/Account/logout`);
};

export const apiValidateToken = async (idToken: any): Promise<any> => {
    return await apiGet(`/api/Account/validateToken`);
};

/**
 * @Base
 */
export const apiGet = async (endpoint: string) => {
    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenUtil.get()}`,
            },
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
                Authorization: `Bearer ${tokenUtil.get()}`,
            },
            body: JSON.stringify(data),
        });

        return res;
    } catch (error) {
        // handle properly someday
        console.error(error);
    }
};

const apiPut = async (endpoint: string, data: any) => {
    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenUtil.get()}`,
            },
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
            headers: {
                Authorization: `Bearer ${tokenUtil.get()}`,
            },
        });

        return res;
    } catch (error) {
        // handle properly someday
        console.error(error);
    }
};
