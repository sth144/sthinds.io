import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client"
import { LOAD_ARTICLES } from "models/queries/queries";
import { articleSelected } from "models/actions/article-selected.action";
import { Link } from "react-router-dom";
import "./get-articles.component.scss";

// TODO: try react-redux useSelector and useDispatch to manage Redux store from functional component

function GetArticles(): JSX.Element {
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
      console.log(article);
      dispatch(articleSelected(article))
      // TODO: redirect body component to article content
      //        - dispatch Redux action
      //        - redirect in render (BodyComponent)
    }
  }

	return (
    <div>
        <nav className="article-nav">
    			{articles.map((article: Record<string, string>) => 
            <span>
              <Link to="/article/show" onClick={articleSelectedFactory(article)}>
                <h1>{article.title}</h1> 
                {/* <h3>{article.subtitle}</h3> */}
                <h5>{article.author}</h5>
              </Link>
            </span>)}
        </nav>
    </div>
	);
}

export default GetArticles;