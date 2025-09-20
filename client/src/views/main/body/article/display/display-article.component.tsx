import { useQuery } from "@apollo/client";
import { LOAD_ARTICLE } from "models/queries/article.queries";
import React, { Component, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./display-article.component.scss";
import { IAuthenticationState } from "sthinds.io-lib";
import { Link } from "react-router-dom";
import ArticleAuthorDateBanner from "./article-author-date-banner.component";
import { typedConnect } from "models/store";

interface IDisplayArticleComponentProps {
  dispatch?: (action: any) => void;
  articleID?: string;
  authentication?: IAuthenticationState;
}
interface IDisplayArticleComponentState {
  articleID: string;
}

const mapStateToProps = (state: any) => {
  return {
    articleID: state.article._id,
    authentication: state.authentication,
  };
};

const mapPropsToDispatch = () => {};

@typedConnect(mapStateToProps, mapPropsToDispatch)
export default class DisplayArticleComponent extends Component<
  IDisplayArticleComponentProps,
  IDisplayArticleComponentState
> {
  state: IDisplayArticleComponentState = {
    articleID: "",
  };

  render() {
    return (
      <GetFullArticle
        articleID={this.props.articleID}
        authentication={this.props.authentication}
      ></GetFullArticle>
    );
  }
}

const BlogImage = (props: any) => {
  const [fullSize, setFullSize] = useState();

  return <img style={{ maxWidth: "80%" }} alt={props.alt} src={props.src} />;
};

/** functional component for retrieving article via GraphQL */
// TODO: move this to an injectable service?
function GetFullArticle({
  articleID,
  authentication,
}: IDisplayArticleComponentProps): JSX.Element {
  const { error, loading, data } = useQuery(LOAD_ARTICLE, {
    variables: {
      articleID,
    },
  });

  if (loading) return null as unknown as JSX.Element;
  if (error) return `Error! ${error}` as unknown as JSX.Element;
  const article = data.article;

  const renderers = {
    img: BlogImage,
    code: (props: { children: React.ReactNode }) => {
      return <div className="code-block">{props?.children}</div>;
    },
  };

  return (
    <div className="article-display-div">
      <ArticleAuthorDateBanner
        authorID={article.authorID}
        articleDate={article.date}
      />
      <br></br>
      <h1>
        <strong>{article.title}</strong>
      </h1>
      <h2>{article.subtitle}</h2>
      <br></br>
      <ReactMarkdown
        components={renderers}
        children={article.text}
      ></ReactMarkdown>
      {/* TODO: hide these when not logged in as author */}
      {authentication?.isLoggedIn &&
      authentication?._id === article.authorID ? (
        <div className="flex-row justify-around">
          <div>
            <Link to="/article/edit">Edit Article</Link>
          </div>
          <div>
            <Link className="delete-link" to="/article/delete">
              Delete Article
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* TODO: add comment and like feature */}
    </div>
  );
}
