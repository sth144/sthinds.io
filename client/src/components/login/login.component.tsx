import personIcon from "assets/person.svg";
import loginIcon from "assets/login-svgrepo-com.svg";
import { loginSucceeded } from "models/actions/login-succeeded.action";
import { StatePrototype } from "models/state.prototype";
import React, { Component, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { IAuthenticationState } from "sthinds.io-lib";
import { Dropdown } from "react-bootstrap";
import "./login.component.scss";
import { loggedOut } from "models/actions/logged-out.action";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "models/queries/user.queries";
import { loginUIDRetrieved } from "models/actions/login-uid-retrieved.action";
import store, { typedConnect } from "models/store";

/**
 * Map Redux state values to component props
 */
const mapStateToProps = (state: StatePrototype) => {
  return {
    authenticationState: state.authentication,
  };
};

const mapDispatchToProps = (dispatch: unknown) => {
  return {
    dispatch,
  };
};

interface ILoginComponentProps {
  authenticationState: IAuthenticationState;
  dispatch: (action: unknown) => void;
}

@typedConnect(mapStateToProps, mapDispatchToProps)
export default class LoginComponent extends Component<ILoginComponentProps> {
  // TODO: dispatch loginInitiated action, login failed action
  localLogin = () => {
    const mockUser = {
      _id: "6503e1a0b9f1c2d3e4f56789",
      token: "mockToken",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      isLoggedIn: true,
    };
    this.props.dispatch(loginSucceeded(mockUser));
  };

  render() {
    return (
      <div>
        <Routes>
          <Route
            path="/login/success/:email/:firstName/:lastName/:token"
            element={(<HandleSuccessRedirect />) as JSX.Element}
          ></Route>
        </Routes>
        {this.props.authenticationState.isLoggedIn ? (
          <LoggedIn
            email={this.props.authenticationState.email}
            firstName={this.props.authenticationState.firstName}
            lastName={this.props.authenticationState.lastName}
          />
        ) : (
          <NotLoggedIn localLogin={this.localLogin} />
        )}
      </div>
    );
  }
}

interface NotLoggedInProps {
  localLogin: () => void;
}

function NotLoggedIn({ localLogin }: NotLoggedInProps) {
  const isDevMode = process.env.NODE_ENV === "development"; // Check if in development mode

  return (
    <a onClick={isDevMode ? localLogin : undefined}>
      <img src={loginIcon} height={30} alt="login"></img>
    </a>
  );
}

function LoggedIn(props: Partial<IAuthenticationState>) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(loggedOut());

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const goToProfileView = () => {
    navigate("/profile");
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle className="profile-dropdown">
          <img src={personIcon} height={30} alt="profile"></img>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={goToProfileView}>Profile</Dropdown.Item>
          <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

function HandleSuccessRedirect(): JSX.Element {
  const { token, email, firstName, lastName } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatch(
      loginSucceeded({
        _id: null,
        token,
        email,
        firstName,
        lastName,
        isLoggedIn: true,
      })
    );

    // TODO: navigate to top of history stack instead of "/"
    const checkUIDPoll = setInterval(() => {
      const UID = (store.getState() as { authentication: IAuthenticationState })
        .authentication._id;
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
      email,
    },
    pollInterval: 500,
  });
  if (loading) return null as unknown as JSX.Element;
  if (error) return `Error! ${error}` as unknown as JSX.Element;
  const user = data && "getUserByEmail" in data ? data.getUserByEmail : {};

  dispatch(loginUIDRetrieved(user._id));

  return <div>...</div>;
}
