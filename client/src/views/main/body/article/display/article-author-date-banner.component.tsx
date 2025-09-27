import { useQuery } from "@apollo/client";
import { GET_AUTHOR_INFO } from "models/queries/author.queries";
import React from "react";
import { formatArticleDate } from "sthinds.io-lib";
import "./display-article.component.scss";

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
    <>
      {" "}
      <span className="date-span-article-display">
        {formatArticleDate(new Date(articleDate))}
      </span>
    </>
  );
}
