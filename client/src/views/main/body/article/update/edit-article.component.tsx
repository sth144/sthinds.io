import { LOAD_ARTICLE } from "models/queries/article.queries";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { IArticle } from "sthinds.io-lib";
import GraphQLService from "network/graphql.service";
import { PATCH_ARTICLE } from "models/mutations/article.mutations";
import { TypedConnect } from "models/store";
import { Navigate } from "react-router-dom";

interface IEditArticleComponentProps {
  dispatch?: (action: unknown) => void;
  articleID?: string;
}
interface IEditArticleComponentState extends IArticle {
  redirect: boolean;
}

const mapStateToProps = (state: { article: IArticle }) => {
  return {
    articleID: state.article._id,
  };
};

const mapPropsToDispatch = () => {};

@TypedConnect(mapStateToProps, mapPropsToDispatch)
export default class EditArticleComponent extends Component<
  IEditArticleComponentProps,
  IEditArticleComponentState
> {
  state: IEditArticleComponentState = {
    _id: "",
    title: "",
    subtitle: "",
    authorID: "",
    date: "",
    text: "",
    redirect: false,
  };

  componentDidMount() {
    this.setState({
      _id: this.props.articleID,
      date: new Date().toDateString(),
    });

    GraphQLService.query({
      query: LOAD_ARTICLE,
      variables: {
        articleID: this.props.articleID,
      },
    }).then((result) => {
      this.setState(result.data.article);
    });
  }

  public updateArticle = () => {
    // TODO: enforce rule that only same author who created article can edit
    GraphQLService.mutate({
      mutation: PATCH_ARTICLE,
      variables: {
        _id: this.state._id,
        patch: {
          title: this.state.title,
          subtitle: this.state.subtitle,
          authorID: this.state.authorID,
          date: this.state.date,
          text: this.state.text,
        },
      },
    })
      .then((result) => {
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  handleCancel = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/article/show" replace />;
    }
    return (
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(e) => {
                this.setState({
                  title: e.target.value,
                });
              }}
              type="text"
              placeholder="Enter Title"
              value={this.state.title}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Subtitle</Form.Label>
            <Form.Control
              onChange={(e) => {
                this.setState({
                  subtitle: e.target.value,
                });
              }}
              type="text"
              placeholder="Enter Subtitle"
              value={this.state.subtitle}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              onChange={(e) => {
                this.setState({
                  text: e.target.value,
                });
              }}
              type="text"
              as="textarea"
              rows={3}
              placeholder="Enter Text"
              value={this.state.text}
            />
          </Form.Group>
          <Button variant="secondary" type="button" onClick={this.handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={this.updateArticle}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
