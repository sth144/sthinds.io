import React, { useState } from "react";
import { CREATE_ARTICLE } from "models/mutations/article.mutations";
import { useMutation } from "@apollo/client";
import { Button, Form } from "react-bootstrap";
import { store } from "models/store";
import { IAuthenticationState } from "sthinds.io-lib";
import "./create-article.component.scss";

function CreateArticleForm() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Initialize date state
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [text, setText] = useState("");

  // TODO: move mutations and queries to an external injectable service
  const [createArticle, { error }] = useMutation(CREATE_ARTICLE);

  const addArticle = () => {
    const authorID = (
      store.getState() as { authentication: IAuthenticationState }
    )?.authentication._id;

    console.log(
      `Creating article: ${title}, ${subtitle}, ${text}, ${authorID}`
    );

    createArticle({
      variables: {
        authorID: authorID,
        title: title,
        subtitle: subtitle,
        date: new Date(date).toDateString(), // Use the date state
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
        <div className="flex-row whole-width justify-end">
          <Button variant="primary" type="submit" onClick={addArticle}>
            Submit
          </Button>
        </div>
        <Form.Group className="mb-3 half-width">
          <Form.Label>Date</Form.Label> {/* New Date Input */}
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)} // Update date state
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default CreateArticleForm;
