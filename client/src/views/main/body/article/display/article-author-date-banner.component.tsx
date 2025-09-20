import { useQuery } from "@apollo/client";
import { GET_AUTHOR_INFO } from "models/queries/author.queries";
import React from "react";

export default function ArticleAuthorDateBanner({
  authorID,
  articleDate,
}: {
  authorID: string;
  articleDate: string;
}): JSX.Element {
  const authorQueryResult = useQuery(GET_AUTHOR_INFO, {
    variables: {
      authorID: authorID,
    },
  });
  if (authorQueryResult.loading) return null as unknown as JSX.Element;
  if (authorQueryResult.error)
    return `Error! ${authorQueryResult.error}` as unknown as JSX.Element;

  const author = authorQueryResult.data.user;
  return (
    <h4>
      {author.firstName} {author.lastName}, {articleDate}
    </h4>
  );
}
