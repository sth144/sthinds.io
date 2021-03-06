import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateArticleForm from "./create/create-article.component";
import DisplayArticleComponent from "./display/display-article.component";
import { Route, Routes } from "react-router-dom";

@connect(() => { }, () => { })
export default class ArticlePanelComponent extends Component {
  constructor(props: object) { 
    super(props); 
  }

  render() {
    /** TODO: auth guard for CreateArticleForm */
    return (
      <div>
        <Routes>
          <Route path="create" element={<CreateArticleForm/>}></Route>
          <Route path="show" element={<DisplayArticleComponent/>}></Route>
        </Routes>
      </div>
    );
  }
}