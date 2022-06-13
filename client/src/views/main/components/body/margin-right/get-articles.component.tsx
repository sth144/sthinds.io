import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client"
import { LOAD_ARTICLES } from "models/queries/queries";
import "./get-articles.component.scss";

// TODO: try react-redux useSelector and useDispatch to manage Redux store from functional component

function GetArticles(): JSX.Element {
	const { error, loading, data } = useQuery(LOAD_ARTICLES);

	const [articles, setArticles] = useState([]);

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
      // TODO: redirect body component to article content
    }
  }

	return (
    <div>
        <nav className="article-nav">
    			{articles.map((article: Record<string, string>) => 
            <span>
              <a href="#" onClick={articleSelectedFactory(article)}>
                <h1>{article.title}</h1> 
                {/* <h3>{article.subtitle}</h3> */}
                <h5>{article.author}</h5>
              </a>
            </span>)}
        </nav>
    </div>
	);
}

export default GetArticles;