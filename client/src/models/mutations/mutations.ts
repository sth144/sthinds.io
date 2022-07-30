import { gql } from "@apollo/client";

export const CREATE_ARTICLE = gql`
	mutation createArticle(
		$authorID: String!,
		$title: String!,
		$subtitle: String!,
		$date: String!,
		$text: String!
	) {
		createArticle(
			authorID: $authorID, 
			title: $title,
			subtitle: $subtitle, 
			date: $date,
			text: $text
		) {
			_id
		}
	}
`; 