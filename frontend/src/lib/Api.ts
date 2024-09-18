import { Article } from "@/models/Articles";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const apiGetArticles = async () => {
    try {
        return await apiGet(`api/Article`);
    } catch (error) {
        throw error;
    }
};

export const apiGetArticleById = async (id: string) => {
    try {
        return await apiGet(`api/Article/${id}`);
    } catch (error) {
        throw error;
    }
};

export const apiDeleteArticleById = async (id: string) => {
    try {
        return await apiDelete(`api/Article/${id}`);
    } catch (error) {
        throw error;
    }
};

export const apiSubmitArticle = async (data: Article) => {
    try {
        return await apiPost(`api/Article`, data);
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
        });

        return res;
    } catch (error) {
        // handle properly someday
        console.error(error);
    }
};
