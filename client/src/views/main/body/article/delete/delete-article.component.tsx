import { Modal, Button } from "react-bootstrap";
import store from "models/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GraphQLService from "network/graphql.service";
import { DELETE_ARTICLE } from "models/mutations/article.mutations";
import { LOAD_ARTICLES } from "models/queries/article.queries";
import { IArticle } from "sthinds.io-lib";
import React from "react";

interface DeleteArticleProps {
  article: IArticle;
  show: boolean;
  onClose: () => void;
}

export default function DeleteArticleComponent({
  article,
  show,
  onClose,
}: DeleteArticleProps): JSX.Element {
  const navigate = useNavigate();

  async function deleteArticle(): Promise<void> {
    await GraphQLService.mutate({
      mutation: DELETE_ARTICLE,
      variables: { _id: article._id },
    });
    onClose();
    navigate("/");
    // Refetch the list of articles (replace with your actual query)
    await GraphQLService.refetchQueries({
      include: [LOAD_ARTICLES], // name of the query in Apollo
    });
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Article "{article.title}"</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This action is irreversible. Are you sure you want to proceed?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={deleteArticle}>
          Delete
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
