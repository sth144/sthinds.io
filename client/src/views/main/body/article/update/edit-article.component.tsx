import React, { Component } from 'react';
import { connect } from 'react-redux';

interface IEditArticleComponentProps {
  dispatch: (action) => void,
  articleID: string
};
interface IEditArticleComponentState {
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
export default class EditArticleComponent extends Component<
  IEditArticleComponentProps, 
  IEditArticleComponentState> {

  state: IEditArticleComponentState = {
    articleID: ""
  };

  render() {
    return (
      <div>EDIT ARTICLE {this.props.articleID}</div>
    )
  }
}