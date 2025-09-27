import { useQuery } from "@apollo/client";
import { LOAD_ARTICLE } from "models/queries/article.queries";
import React, { Component, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // theme
import "./display-article.component.scss";
import { IAuthenticationState } from "sthinds.io-lib";
import { Link } from "react-router-dom";
import ArticleAuthorDateBanner from "./article-author-date-banner.component";
import { TypedConnect } from "models/store";
import DeleteArticleComponent from "../delete/delete-article.component";

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

@TypedConnect(mapStateToProps, mapPropsToDispatch)
export default class DisplayArticleComponent extends Component<
  IDisplayArticleComponentProps,
  IDisplayArticleComponentState
> {
  state: IDisplayArticleComponentState = {
    articleID: "",
  };

  render() {
    return (
      <>
        <GetFullArticle
          articleID={this.props.articleID}
          authentication={this.props.authentication}
        ></GetFullArticle>
      </>
    );
  }
}

const BlogImage = (props: any) => {
  const [fullSize, setFullSize] = useState();

  return <img style={{ maxWidth: "80%" }} alt={props.alt} src={props.src} />;
};

const CodeBlock = ({ inline, className, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const codeString = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return !inline && match ? (
    <div className="code-block-wrapper">
      <button className="copy-btn" onClick={handleCopy}>
        {copied ? "✅" : "📋"}
      </button>
      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag="div"
        wrapLongLines={false}
        {...props}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

/** functional component for retrieving article via GraphQL */
// TODO: move this to an injectable service?
function GetFullArticle({
  articleID,
  authentication,
}: IDisplayArticleComponentProps): JSX.Element {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { error, loading, data } = useQuery(LOAD_ARTICLE, {
    variables: {
      articleID,
    },
  });

  if (loading) return null as unknown as JSX.Element;
  if (error) return `Error! ${error}` as unknown as JSX.Element;
  const article = data.article;
  const articleDate = new Date(article.date);
  const articleDateString = articleDate.toLocaleString(); // Convert to string

  const renderers = {
    img: BlogImage,
    code: CodeBlock,
  };

  return (
    <div className="article-display-div">
      <h1 className="article-title">
        <strong>{article.title}</strong>
      </h1>
      <div className="flex-row whole-width justify-between">
        <div className="article-subtitle">
          <h5>{article.subtitle}</h5>
        </div>
        <ArticleAuthorDateBanner
          authorID={article.authorID}
          articleDate={articleDateString} // Pass string instead of Date object
        />
      </div>
      <ReactMarkdown
        components={renderers}
        children={article.text}
      ></ReactMarkdown>
      {/* TODO: hide these when not logged in as author */}
      {authentication?.isLoggedIn &&
      authentication?._id === article.authorID ? (
        <div className="flex-row justify-around">
          <div>
            <Link to={`/article/edit/${articleID}`}>Edit Article</Link>{" "}
            {/* Ensure articleID is used correctly */}
          </div>
          <div>
            <Link
              className="delete-link"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Article
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}

      <DeleteArticleComponent
        article={article}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
      {/* TODO: add comment and like feature */}
    </div>
  );
}
