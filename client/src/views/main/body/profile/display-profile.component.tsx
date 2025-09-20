import { TypedConnect } from "models/store";
import React from "react";
import GraphQLService from "network/graphql.service";
import { GET_AUTHOR_INFO } from "models/queries/author.queries";
import { DELETE_PROFILE } from "models/mutations/user.mutations";
import { IUser, OAuthProvider } from "sthinds.io-lib";
import { Button, Modal } from "react-bootstrap";
import { loggedOut } from "models/actions/logged-out.action";

interface IDisplayProfileComponentProps {
  dispatch?: (action: unknown) => void;
  profileID?: string;
}
interface IDisplayArticleComponentState extends IUser {
  modalOpen: boolean;
  authentication: {
    _id: string;
  };
}

const mapStateToProps = (state: IDisplayArticleComponentState) => {
  return {
    profileID: state.authentication._id,
  };
};
const mapPropsToDispatch = (dispatch: unknown) => {
  return {
    dispatch,
  };
};

@TypedConnect(mapStateToProps, mapPropsToDispatch)
export default class DisplayProfileComponent extends React.Component<
  IDisplayProfileComponentProps,
  IDisplayArticleComponentState
> {
  public state: IDisplayArticleComponentState = {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    accessToken: "",
    thirdPartyID: "",
    thirdPartyIDProvider: OAuthProvider.Google,
    modalOpen: false,
    authentication: {
      _id: "",
    },
  };

  componentDidMount() {
    GraphQLService.query({
      query: GET_AUTHOR_INFO,
      variables: {
        authorID: this.props.profileID,
      },
    }).then((response) => {
      this.setState(response.data.user);
    });
  }

  public launchDeleteModal = (): void => {
    this.setState({
      modalOpen: true,
    });
  };

  public deleteProfile = (): void => {
    GraphQLService.mutate({
      mutation: DELETE_PROFILE,
      variables: {
        _id: this.state._id,
      },
    })
      .then(() => {
        if (this.props.dispatch) {
          this.props.dispatch(loggedOut());
        }
        /** navigate home and remove profile view from history */

        window.location.replace("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <div>
        {!this.state.modalOpen ? (
          <div>
            <h2>Profile</h2>
            <p>
              {this.state.firstName} {this.state.lastName}
            </p>
            <p>{this.state.email}</p>
            <Button type="reset" onClick={this.launchDeleteModal}>
              Delete Profile
            </Button>
          </div>
        ) : (
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Delete Profile?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>
                This action is irreversible. Are you sure you want to proceed?
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="danger" onClick={this.deleteProfile}>
                Delete
              </Button>
              <Button
                variant="primary"
                onClick={() => this.setState({ modalOpen: false })}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        )}
      </div>
    );
  }
}
