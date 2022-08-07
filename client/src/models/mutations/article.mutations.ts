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

export const PATCH_ARTICLE = gql`
  mutation patchArticle(
		$_id: String!,
    $patch: ArticleInput!
  ) {
    patchArticle(
      _id: $_id,
      patch: $patch
    ) {
      _id
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation deleteArticle(
		$_id: String!
  ) {
    deleteArticle(
      _id: $_id
    ) {
      _id
    }
  }
`;
