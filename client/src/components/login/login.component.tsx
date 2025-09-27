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
import store, { TypedConnect } from "models/store";
import { CREATE_USER } from "models/mutations/user.mutations"; // Import the CREATE_USER mutation
import GraphQLService from "network/graphql.service";

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
  client: any; // Add client property for Apollo Client
}

interface NotLoggedInProps {
  localLogin: () => void;
}

function NotLoggedIn({ localLogin }: NotLoggedInProps) {
  // TODO: implement
  const doLogin = (event: any) => {
    event.preventDefault();
    if (process.env.NODE_ENV === "development") {
      // your backend running locally on port 5000 for example
      window.location.href = "http://localhost:3200/api/google";
    } else {
      // production
      window.location.pathname = "/api/google";
    }
  };

  // In production, clicking the login icon redirects to the Google OAuth endpoint
  // In development, it triggers a local login for testing purposes only

  return (
    <a onClick={doLogin}>
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

  console.log("HandleSuccessRedirect params:", {
    token,
    email,
    firstName,
    lastName,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // Dispatch once
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

    // Navigate once after dispatch
    const timer = setTimeout(() => {
      navigate("/"); // no need to reload the page
    }, 100); // small delay to ensure state is set

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
    return () => clearTimeout(timer); // cleanup
  }, [dispatch, navigate, token, email, firstName, lastName]);

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
@TypedConnect(mapStateToProps, mapDispatchToProps)
export default class LoginComponent extends Component<ILoginComponentProps> {
  // TODO: dispatch loginInitiated action, login failed action
  localLogin = async () => {
    const email = "sthinds144@gmail.com";
    const { data } = await GraphQLService.query({
      query: GET_USER_BY_EMAIL,
      variables: { email },
    });
    if (data.getUserByEmail) {
      // User exists, dispatch login
      const user = data.getUserByEmail;
      this.props.dispatch(loginSucceeded(user));
    } else {
      // User does not exist, create user
      const newUser = {
        _id: "6503e1a0b9f1c2d3e4f56789", // Replace with actual ID generation logic
        email,
        firstName: "Sean", // Replace with actual first name input
        lastName: "Hinds", // Replace with actual last name input
      };

      await this.props.client.mutate({
        mutation: CREATE_USER,
        variables: { input: newUser },
      });

      this.props.dispatch(loginSucceeded(newUser));
    }
    // TODO: token???
    window.location.pathname = `/api/local-login/success`;
  };

  render() {
    console.log(
      "this.props.authenticationState",
      this.props.authenticationState
    );
    console.log(process.env.NODE_ENV);
    return (
      <div>
        <Routes>
          <Route
            path="/login/success/:email/:firstName/:lastName/:token"
            element={(<HandleSuccessRedirect />) as JSX.Element}
          ></Route>
          <Route
            path="/api/local-login/success"
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
