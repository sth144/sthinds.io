import { Modal, Button } from "react-bootstrap";
import store from "models/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GraphQLService from "network/graphql.service";
import { DELETE_ARTICLE } from "models/mutations/article.mutations";

export default function DeleteArticleComponent(): JSX.Element {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const article = store.getState().article;

  async function deleteArticle(): Promise<boolean> {
    return GraphQLService.mutate({
      mutation: DELETE_ARTICLE,
      variables: {
        _id: article._id
      }
    }).then(() => {
      setTimeout(() => {
        navigate("/");
        window.location.reload(true);
      }, 100);
      return true
    });
  }

  function cancel(): void {
    setShow(false);
    setTimeout(() => {
      window.location.reload();
      navigate("/");
    }, 1000); 
  }

  return (
    <Modal.Dialog show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Article "{article.title}"</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>This action is irreversible. Are you sure you want to proceed?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={deleteArticle}>Delete</Button>
        <Button variant="primary" onClick={cancel}>Cancel</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}