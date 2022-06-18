import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateArticleForm from "./create-article.component";
import DisplayArticleComponent from "./display-article.component";
import { Route, Routes } from "react-router-dom";

@connect(() => { }, () => { })
export default class ArticlePanelComponent extends Component {
  constructor(props: object) { 
    super(props); 
  }

  render() {


    /** TODO: render article (markdown) here */
    return (
      <div>
        <Routes>
          <Route path="create" element={<CreateArticleForm/>}></Route>
          {/* TODO: pass parameters to this route to render specific article */}
          <Route path="show" element={<DisplayArticleComponent/>}></Route>
        </Routes>
      </div>
    );
  }
}