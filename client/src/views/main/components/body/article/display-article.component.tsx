import { useQuery } from '@apollo/client';
import { LOAD_ARTICLE } from 'models/queries/queries';
import React, { Component } from 'react';
import { connect } from 'react-redux';

interface IDisplayArticleComponentProps {
  dispatch: (action) => void,
  articleID: string
};
interface IDisplayArticleComponentState {
  articleID: string
}

@connect(
  (state, ownProps) => { 
    return {
      articleID: state.article._id
    }
  }, 
  () => { }
)
export default class DisplayArticleComponent extends Component<
  IDisplayArticleComponentProps, 
  IDisplayArticleComponentState> {

  state: IDisplayArticleComponentState = {
    articleID: ""
  };

  constructor(props: object) { super(props); }

  render() {
    /** TODO: render article (markdown) here */
    return (
      <GetFullArticle articleID={this.props.articleID}></GetFullArticle>
    );
  }
}

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

  // TODO: dispatch articleReceived action here to update state

  return (
    <div>
      <h1>{article.title}</h1>
      <h2>{article.subtitle}</h2>
      <h3>{article.author}, {article.date}</h3>
      <div>{article.text}</div>
    </div>
  );
}