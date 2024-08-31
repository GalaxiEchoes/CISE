import React, { useState, useEffect } from "react";
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import { Article } from "./Articles";
function ShowArticlesList() {
    const [articles, setArticles] = useState<[Article?]>([]);
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/article")
            .then((res) => {
                return res.json();
            })
            .then((articles) => {
                setArticles(articles);
            })
            .catch((err) => {
                console.log("Error from ShowArticleList: " + err);
            });
    }, []);
    const articleList =
        articles.length === 0
            ? "there is no article record!"
            : articles.map((article, k) => (
                  <ArticleCard article={article} key={k} />
              ));
    return (
        <div className="ShowArticleList">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <h2 className="display-4 text-center">Articles List</h2>
                    </div>
                    <div className="col-md-11">
                        <Link
                            href="/articles/add"
                            className="btn btn-outline-warning float-right"
                        >
                            + Add New Article
                        </Link>
                        <br />
                        <br />
                        <hr />
                    </div>
                </div>
                <div className="list">{articleList}</div>
            </div>
        </div>
    );
}
export default ShowArticlesList;
