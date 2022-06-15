import React, { Component } from 'react';
import './app.scss';
import { ApolloProvider } from "@apollo/client";
import HeaderComponent from "views/main/components/header/header.component";
import BodyComponent from "views/main/components/body/body.component";
import FooterComponent from "views/main/components/footer/footer.component";
import { connect } from 'react-redux';
import { initialize } from "./models/actions/initialize.action";
import GraphQLService from "./network/graphql.service";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

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
  componentDidMount(){
    document.title = "sthinds.io";
  }

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
      <Router>
      <ApolloProvider client={GraphQLService}>
      <div className="App">
        <HeaderComponent></HeaderComponent> 
        <BodyComponent></BodyComponent>
        <FooterComponent></FooterComponent>
      </div>
      </ApolloProvider>
      </Router>
    );
  }
}
