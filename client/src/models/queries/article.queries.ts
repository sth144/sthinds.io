import { gql } from "@apollo/client";

export const LOAD_ARTICLES = gql`
	query {
		articles {
      _id
			authorID
			title
      subtitle
		}
	}
`;

export const LOAD_ARTICLE = gql`
  query($articleID: String!) {
    article(_id: $articleID) {
      _id
      authorID
      title
      subtitle
      text
      date
    }
  }
`
