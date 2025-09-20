import React, { useState } from "react";
import { CREATE_ARTICLE } from "models/mutations/article.mutations";
import { useMutation } from "@apollo/client";
import { Button, Form } from "react-bootstrap";
import store from "models/store";
import { IAuthenticationState } from "sthinds.io-lib";

function CreateArticleForm() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [text, setText] = useState("");

  // TODO: move mutations and queries to an external injectable service
  const [createArticle, { error }] = useMutation(CREATE_ARTICLE);

  const addArticle = () => {
    const authorID = (
      store.getState() as { authentication: IAuthenticationState }
    )?.authentication._id;

    createArticle({
      variables: {
        authorID: authorID,
        title: title,
        subtitle: subtitle,
        date: new Date().toDateString(),
        text: text,
      },
    });

    if (error) {
      console.error(error);
    }
  };

  /** TODO: markdown editor */
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Enter Title"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Subtitle</Form.Label>
          <Form.Control
            onChange={(e) => {
              setSubtitle(e.target.value);
            }}
            type="text"
            placeholder="Enter Subtitle"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Text</Form.Label>
          <Form.Control
            onChange={(e) => {
              setText(e.target.value);
            }}
            type="text"
            as="textarea"
            rows={3}
            placeholder="Enter Text"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={addArticle}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateArticleForm;
