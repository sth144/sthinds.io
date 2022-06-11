import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client"
import { LOAD_ARTICLES } from "models/queries/queries";

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

	return (
		<div>
			{articles.map((article: Record<string, string>) => 
				<span><h1> {article.title}</h1> <h2>{article.author}</h2></span>)}
		</div>
	);
}

export default GetArticles;