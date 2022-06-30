import "reflect-metadata";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app';
import reportWebVitals from './network/service-worker/reportWebVitals';
import * as serviceWorker from "./network/service-worker/serviceWorker";
import { Provider as ReduxProvider } from "react-redux";
import GraphQLService from "./network/graphql.service";
import { ApolloProvider } from "@apollo/client";
import store from "./models/store";

ReactDOM.render(
  <React.StrictMode>
  <ReduxProvider store={store}>
  <ApolloProvider client={GraphQLService}>
    <App />
  </ApolloProvider>
  </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register();
