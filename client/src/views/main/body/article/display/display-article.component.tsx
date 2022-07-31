import { useQuery } from '@apollo/client';
import { LOAD_ARTICLE } from 'models/queries/article.queries';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import "./display-article.component.scss";
import { IAuthenticationState } from 'sthinds.io-lib';
import { Link } from "react-router-dom";
import ArticleAuthorDateBanner from "./article-author-date-banner.component";

interface IDisplayArticleComponentProps {
  dispatch: (action) => void,
  articleID: string,
  authentication: IAuthenticationState
};
interface IDisplayArticleComponentState {
  articleID: string
}


const mapStateToProps = (state, ownProps) => { 
  return {
    articleID: state.article._id,
    authentication: state.authentication
  }
};

const mapPropsToDispatch = () => { };

@connect(
  mapStateToProps,
  mapPropsToDispatch
)
export default class DisplayArticleComponent extends Component<
  IDisplayArticleComponentProps, 
  IDisplayArticleComponentState> {

  state: IDisplayArticleComponentState = {
    articleID: ""
  };

  constructor(props: object) { super(props); }

  render() {
    return (
      <GetFullArticle articleID={this.props.articleID}></GetFullArticle>
    );
  }
}

/** functional component for retrieving article via GraphQL */
// TODO: move this to an injectable service?
function GetFullArticle({ articleID }: IDisplayArticleComponentProps) {
  const { error, loading, data } = 
    useQuery(LOAD_ARTICLE, { 
      variables: { 
        articleID 
      }
    });
  
  if (loading) return null;
  if (error) return `Error! ${error}`;
  const article = data.article;  
  
  // TODO: add a way to delete an article

  return (
    <div className='article-display-div'>
      <ArticleAuthorDateBanner authorID={article.authorID} articleDate={article.date}/>
      <br></br>
      <h1><strong>{article.title}</strong></h1>
      <h2>{article.subtitle}</h2>
      <br></br>
      <ReactMarkdown children={article.text}></ReactMarkdown>
      <div className="flex-row justify-around">
        {/* TODO: hide these when not logged in as author */}
        <div>
          <Link to="/article/edit">Edit Article</Link>
        </div>
        <div>
          <Link className="delete-link" to="/article/delete">Delete Article</Link>
        </div>
      </div>
      {/* TODO: add comment and like feature */}
    </div>
  );
}
