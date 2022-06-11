import React, { Component } from 'react';
import './app.scss';

import { 
  ApolloClient, InMemoryCache, ApolloProvider, 
  HttpLink, from 
} from "@apollo/client";
import { onError, ErrorResponse } from "@apollo/client/link/error" 
import HeaderComponent from "views/main/components/header/header.component";
import BodyComponent from "views/main/components/body/body.component";
import FooterComponent from "views/main/components/footer/footer.component";
import { connect, MapDispatchToPropsNonObject, MapStateToPropsParam } from 'react-redux';
import { initialize } from "./models/actions/initialize.action";

// TODO: separate this client instance to it's own file and inject
const apollo = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    onError((errorResponse: ErrorResponse) => {
      if (errorResponse.graphQLErrors) {
        errorResponse.graphQLErrors
          .forEach((error) => {
            alert(`GraphQL error ${error.message}`);
          });
      }
    }), 
    new HttpLink({uri: "http://localhost:8000/graphql"})
  ]) 
});

interface IAppComponentProps {
  dispatch: (action: unknown) => void
}

interface IAppComponentState {
  
}

/**
 * Map Redux state values to component props
 */
const mapStateToProps = (state: IAppComponentState) => {
  return { };
}

const mapDispatchToProps = (dispatch: unknown) => {
  return { };
}

/**
* connect() allows components to connect to the global redux datastore
*  - can map properties from store state to component props
*/
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component<IAppComponentProps, IAppComponentState> {

  public state: IAppComponentState = { };

  constructor(public props: IAppComponentProps) {
    super(props);
    /**
     * TODO: on instantiation, load cached state (stored in browser localStorage)
     */
    this.loadStateFromLocalStorage();
  }



    /**
     * load cached state from browser localStorage
     *  - this allows persistent state across page reloads
     */
   private loadStateFromLocalStorage(): void {
    const cachedState = localStorage.getItem('studySeatState');
    if (cachedState === null) {
        return undefined;
    }
    /**
     * dispatch an initialization action to the store
     *  - passed through reducers to generate initial state
     */
    this.props.dispatch(initialize(JSON.parse(cachedState)));
  }

  render() {
    return (
      <ApolloProvider client={apollo}>
      <div className="App">
        <HeaderComponent></HeaderComponent>
        <BodyComponent></BodyComponent>
        <FooterComponent></FooterComponent>
      </div>
      </ApolloProvider>
    );
  }
}


// TODO: call connect() to hydrate with Redux data
