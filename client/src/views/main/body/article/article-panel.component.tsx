import React, { Component } from "react";
import CreateArticleForm from "./create/create-article.component";
import DisplayArticleComponent from "./display/display-article.component";
import { Route, Routes } from "react-router-dom";
import EditArticleComponent from "./update/edit-article.component";
import DeleteArticleComponent from "./delete/delete-article.component";
import { TypedConnect } from "models/store";

@TypedConnect(
  () => {
    return {};
  },
  () => {
    return {};
  }
)
export default class ArticlePanelComponent extends Component {
  render() {
    /** TODO: auth guards for CreateArticleForm, edit, and delete components */
    return (
      <div>
        <Routes>
          <Route path="create" element={<CreateArticleForm />}></Route>
          <Route path="show" element={<DisplayArticleComponent />}></Route>
          <Route path="edit" element={<EditArticleComponent />}></Route>
          {/* TODO: delete */}
        </Routes>
      </div>
    );
  }
}
