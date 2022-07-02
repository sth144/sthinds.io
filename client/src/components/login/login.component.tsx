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

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle className="profile-dropdown">
          <img src={personIcon} height={30}></img>
        </Dropdown.Toggle>
        <Dropdown.Menu>
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
      token,
      email,
      firstName,
      lastName,
      isLoggedIn: true
    }))
    
    // TODO: navigate to top of history stack instead of "/"
    setTimeout(() => { navigate("/"); window.location.reload(); }, 1000);
  });

  return (<div>...</div>)
}