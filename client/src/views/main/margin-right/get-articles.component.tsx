import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client"
import { LOAD_ARTICLES } from "models/queries/article.queries";
import { articleSelected } from "models/actions/article-selected.action";
import { Link } from "react-router-dom";
import "./get-articles.component.scss";

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
      dispatch(articleSelected(article))
    }
  }

	return (
    <div>
      <nav className="article-nav">
  			{articles.map((article: Record<string, string>) => 
            <Link to="/article/show" onClick={articleSelectedFactory(article)}>
              <div className="two-third-width text-right">
                <div>
                  <h2>{article.title}</h2>  
                  <h5>{article.subtitle}</h5>  
                </div>
              </div>
              <div className="third-width"></div>
            </Link>)}
      </nav>
    </div>
	);
}

export default GetArticles;