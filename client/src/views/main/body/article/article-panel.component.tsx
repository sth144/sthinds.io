import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateArticleForm from "./create/create-article.component";
import DisplayArticleComponent from "./display/display-article.component";
import { Route, Routes } from "react-router-dom";
import EditArticleComponent from './update/edit-article.component';
import DeleteArticleComponent from './delete/delete-article.component';

@connect(() => { }, () => { })
export default class ArticlePanelComponent extends Component {
  constructor(props: object) { 
    super(props); 
  }

  render() {
    /** TODO: auth guards for CreateArticleForm, edit, and delete components */
    return (
      <div>
        <Routes>
          <Route path="create" element={<CreateArticleForm/>}></Route>
          <Route path="show" element={<DisplayArticleComponent/>}></Route>
          <Route path="edit" element={<EditArticleComponent/>}></Route>
          <Route path="delete" element={<DeleteArticleComponent/>}></Route>
          {/* TODO: delete */}
        </Routes>
      </div>
    );
  }
}