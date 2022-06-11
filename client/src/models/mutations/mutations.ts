import { gql } from "@apollo/client";

export const CREATE_ARTICLE = gql`
	mutation createArticle(
		$author: String!,
		$title: String!,
		$subtitle: String!,
		$date: String!,
		$text: String!
	) {
		createArticle(
			author: $author, 
			title: $title,
			subtitle: $subtitle, 
			date: $date,
			text: $text
		) {
			_id
		}
	}
`; 