import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { LOAD_ARTICLES } from "models/queries/article.queries";
import { articleSelected } from "models/actions/article-selected.action";
import { Link } from "react-router-dom";
import "./get-articles.component.scss";
import { formatArticleDate } from "sthinds.io-lib";

// TODO: try react-redux useSelector and useDispatch to manage Redux store from functional component

function GetArticles(): JSX.Element {
  // TODO: move mutations and queries to an external injectable service
  const { error, loading, data } = useQuery(LOAD_ARTICLES);

  const [articles, setArticles] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.articles && data.articles.length > 0) {
      setArticles(data.articles);
    } else {
      setArticles([]);
    }
  }, [data]);

  function articleSelectedFactory(article: any) {
    return function () {
      dispatch(articleSelected(article));
    };
  }

  return (
    <div>
      <nav className="article-nav">
        {articles.map((article: Record<string, string>) => (
          <Link
            key={article._id}
            to="/article/show"
            onClick={articleSelectedFactory(article)}
          >
            <ul className="container whole-width text-left article-list">
              <li>
                <h5 className="get-articles-article-title">{article.title}</h5>

                <h6 className="get-articles-article-subtitle">
                  {article.subtitle}
                </h6>
                <span className="date-span">
                  {formatArticleDate(article.date)}
                </span>
              </li>
              <hr></hr>
            </ul>
            <div className="third-width"></div>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default GetArticles;
