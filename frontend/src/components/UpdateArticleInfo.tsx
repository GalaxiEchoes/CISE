import React, {
    useState,
    useEffect,
    ChangeEvent,
    FormEvent,
    ChangeEventHandler,
} from "react";
import { useParams, useRouter } from "next/navigation";
import { Article, DefaultEmptyArticle } from "./Articles";
import Link from "next/link";
function UpdateArticleInfo() {
    const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
    const id = useParams<{ id: string }>().id;
    const router = useRouter();
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/article/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setArticle(json);
            })
            .catch((err) => {
                console.log("Error from UpdateArticleInfo: " + err);
            });
    }, [id]);
    const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArticle({ ...article, [event.target.name]: event.target.value });
    };
    const textAreaOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setArticle({ ...article, [event.target.name]: event.target.value });
    };
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/article/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(article),
        })
            .then((res) => {
                router.push(`/articles/show/${id}`);
            })
            .catch((err) => {
                console.log("Error from UpdateArticleInfo: " + err);
            });
    };
    return (
        <div className="UpdateArticleInfo">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <br />
                        <Link
                            href="/"
                            className="btn btn-outline-warning float-left"
                        >
                            Show Article List
                        </Link>
                    </div>
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Edit Article</h1>
                        <p className="lead text-center">
                            Update Article&quot;s Info
                        </p>
                    </div>
                </div>
                <div className="col-md-8 m-auto">
                    <form noValidate onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                placeholder="Title of the Article"
                                name="title"
                                className="form-control"
                                value={article.title}
                                onChange={inputOnChange}
                            />
                        </div>

                        <br />
                        <div className="form-group">
                            <label htmlFor="author">Authors</label>
                            <input
                                type="text"
                                placeholder="Authors"
                                name="authors"
                                className="form-control"
                                value={article.authors}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="source">Source</label>
                            <input
                                type="text"
                                placeholder="Source of the Article"
                                name="source"
                                className="form-control"
                                value={article.source}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="pubyear">Publish Year</label>
                            <input
                                type="text"
                                placeholder="Publish Year of the Article"
                                name="pubyear"
                                className="form-control"
                                value={article.pubyear}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="doi">DOI</label>
                            <input
                                type="text"
                                placeholder="DOI of the Article"
                                name="doi"
                                className="form-control"
                                value={article.doi}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="claim">Claim</label>
                            <input
                                type="text"
                                placeholder="Claim of the Article"
                                name="claim"
                                className="form-control"
                                value={article.claim}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="evidence">Evidence</label>
                            <input
                                type="text"
                                placeholder="Evidence of the Article"
                                name="evidence"
                                className="form-control"
                                value={article.evidence}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />
                        <button
                            type="submit"
                            className="btn btn-outline-info btn-lg btn-block"
                        >
                            Update Article
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default UpdateArticleInfo;
