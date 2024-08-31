import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Article, DefaultEmptyArticle } from "./Articles";

const CreateArticleComponent = () => {
    const navigate = useRouter();

    const [article, setArticle] = useState<Article>(DefaultEmptyArticle);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArticle({ ...article, [event.target.name]: event.target.value });
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted');
        console.log(article);
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/article", {
            method: "POST",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify(article),
        })
            .then((res) => {
                console.log(res);
                setArticle(DefaultEmptyArticle);

                // Push to /
                navigate.push("/");
            })
            .catch((err) => {
                console.log("Error from CreateArticle: " + err);
            });
    };

    return (
        <div className="CreateArticle">
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
                    <div className="col-md-10 m-auto">
                        <h1 className="display-4 text-center">Add Article</h1>
                        <p className="lead text-center">Create new Article</p>
                        <form noValidate onSubmit={onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Title of the Article"
                                    name="title"
                                    className="form-control"
                                    value={article.title}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Authors"
                                    name="authors"
                                    className="form-control"
                                    value={article.authors}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Source"
                                    name="source"
                                    className="form-control"
                                    value={article.source}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Publication Year"
                                    name="pubyear"
                                    className="form-control"
                                    value={article.pubyear}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="DOI"
                                    name="doi"
                                    className="form-control"
                                    value={article.doi}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Claim"
                                    name="claim"
                                    className="form-control"
                                    value={article.claim}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Evidence"
                                    name="evidence"
                                    className="form-control"
                                    value={article.evidence}
                                    onChange={onChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-outline-warning btn-block w-100 mb-4 mt-4"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CreateArticleComponent;
