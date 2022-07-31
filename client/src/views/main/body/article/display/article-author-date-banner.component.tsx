import { useQuery } from '@apollo/client';
import { GET_AUTHOR_INFO } from "models/queries/author.queries";

export default function ArticleAuthorDateBanner({ authorID, articleDate }): JSX.Element | string | null {
  const authorQueryResult = useQuery(GET_AUTHOR_INFO, {
      variables: {
        authorID: authorID
      }
    });
  if (authorQueryResult.loading) return null;
  if (authorQueryResult.error) return `Error! ${authorQueryResult.error}`;

  const author = authorQueryResult.data.user;
  return (
    <h4>{author.firstName} {author.lastName}, {articleDate}</h4>
  )
}