import { useQuery } from '@apollo/client';
import { LOAD_ARTICLE } from 'models/queries/queries';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import "./display-article.component.scss";

interface IDisplayArticleComponentProps {
  dispatch: (action) => void,
  articleID: string
};
interface IDisplayArticleComponentState {
  articleID: string
}


const mapStateToProps = (state, ownProps) => { 
  return {
    articleID: state.article._id
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

  return (
    <div className='article-display-div'>
      <h4>{article.author}, {article.date}</h4>
      <br></br>
      <h1><strong>{article.title}</strong></h1>
      <h2>{article.subtitle}</h2>
      <br></br>
      <ReactMarkdown children={article.text}></ReactMarkdown>
    </div>
  );
}