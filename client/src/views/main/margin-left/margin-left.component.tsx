import React, { Component } from "react";
import { Link } from "react-router-dom";
import pencilIcon from "assets/pencil-icon.svg";
import { TypedConnect } from "models/store";
import { Col, Row } from "react-bootstrap";
import LoginComponent from "components/login/login.component";
import "./margin-left.component.scss";
import { IAuthenticationState } from "sthinds.io-lib";
import { ApolloClient } from "@apollo/client";

interface IMarginLeftComponentProps {
  dispatch: (action: unknown) => void;
  authentication: IAuthenticationState;
  client?: ApolloClient; // Add client property
}

const mapStateToProps = (state: { authentication: IAuthenticationState }) => {
  return {
    authentication: {
      isLoggedIn: state?.authentication.isLoggedIn,
    },
  };
};
const mapPropsToDispatch = {};

@TypedConnect(mapStateToProps, mapPropsToDispatch)
export default class MarginLeftComponent extends Component<IMarginLeftComponentProps> {
  // TODO: make link redirect path a state property dependent on authentication prop?

  componentDidMount(): void {}

  render() {
    // TODO: display project links here (at bottom)
    //        - include old Heroku apps!

    return (
      <Col
        md={2}
        style={{ left: 0, maxWidth: "220px" }}
        className="flex-column justify-start align-center whole-height-desktop position-fixed-desktop margin-left-container"
      >
        <div className="quarter-height">
          <Link to="/" className="home-link">
            <h1 className="whole-width text-end">Sean Hinds</h1>
            <h6 className="whole-width text-end">Blog & Portfolio</h6>
          </Link>
        </div>
        <div className="quarter-height">
          <Link
            to={this.props.authentication.isLoggedIn ? "/article/create" : "/"}
            onClick={
              this.props.authentication.isLoggedIn
                ? () => {}
                : () => {
                    window.location.pathname = "/api/google";
                  }
            }
          >
            <img src={pencilIcon} height={30} alt="pencil"></img>
          </Link>
        </div>
        <LoginComponent
          authenticationState={this.props.authentication}
          dispatch={this.props.dispatch}
          client={this.props.client} // Pass the client prop
        ></LoginComponent>
      </Col>
    );
  }
}
