import personIcon from "assets/person.svg";
import { loginSucceeded } from "models/actions/login-succeeded.action";
import { StatePrototype } from "models/state.prototype";
import React, { Component, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { IAuthenticationState } from "sthinds.io-lib";
import { Dropdown } from "react-bootstrap";
import "./login.component.scss"; 
import { loggedOut } from "models/actions/logged-out.action";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "models/queries/user.queries";
import { loginUIDRetrieved } from "models/actions/login-uid-retrieved.action";
import store from "models/store";

/**
 * Map Redux state values to component props
 */
const mapStateToProps = (state: StatePrototype) => {
  return {
    authenticationState: state.authentication
  };
}

const mapDispatchToProps = (dispatch: unknown) => {
  return {
    dispatch
  };
}

interface ILoginComponentProps {
  authenticationState: IAuthenticationState,
  dispatch: (action: unknown) => void
}

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginComponent extends Component<ILoginComponentProps> {

  // TODO: dispatch loginInitiated action, login failed action
  render() {
    return (
      <div>
        <Routes>
          <Route path="/login/success/:email/:firstName/:lastName/:token" element={<HandleSuccessRedirect/>}></Route>
        </Routes>
        {this.props.authenticationState.isLoggedIn 
          ? <LoggedIn email={this.props.authenticationState.email}
                      firstName={this.props.authenticationState.firstName}
                      lastName={this.props.authenticationState.lastName}/> 
          : <NotLoggedIn/>}
      </div>
    ); 
  }
};

function NotLoggedIn() {
  return (
    <a href="/api/google">
      <div>Sign In</div>
    </a>
  );
}

function LoggedIn(props: Partial<IAuthenticationState>) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(loggedOut());

    setTimeout(() => { navigate("/"); }, 1000);
  }

  const goToProfileView = () => {
    // TODO: navigate to view where user can edit name and delete user
  }

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle className="profile-dropdown">
          <img src={personIcon} height={30}></img>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={goToProfileView}>Profile</Dropdown.Item>
          <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

function HandleSuccessRedirect() {
  const { token, email, firstName, lastName } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatch(loginSucceeded({
      _id: null,
      token,
      email,
      firstName,
      lastName,
      isLoggedIn: true
    }));
    
    // TODO: navigate to top of history stack instead of "/"
    const checkUIDPoll = setInterval(() => {
      const UID = store.getState().authentication._id;
      if (UID && typeof UID === "string" && UID.length > 0) {
        clearInterval(checkUIDPoll);
        if (navigationTimeout) {
          clearTimeout(navigationTimeout);
        }
        navigate("/"); 
        window.location.reload(); 
      }
    }, 200);
    const navigationTimeout = setTimeout(() => {
      /** give up */
      clearInterval(checkUIDPoll);
      navigate("/"); 
      window.location.reload(); 
    }, 5000);
  });

  const { data, error, loading } = useQuery(GET_USER_BY_EMAIL, {
    variables: {
      email
    },
    pollInterval: 500
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;
  const user = (data && "getUserByEmail" in data) ? data.getUserByEmail : {};

  dispatch(loginUIDRetrieved(user._id));

  return (<div>...</div>)
}