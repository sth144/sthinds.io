import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(() => { }, () => { })
export default class DisplayArticleComponent extends Component {
  constructor(props: object) { super(props); }


  render() {
    /** TODO: render article (markdown) here */
    return (
      <div>Article</div>
    );
  }
}