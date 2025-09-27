import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import App from "./app";
import reportWebVitals from "./network/service-worker/reportWebVitals";
import * as serviceWorker from "./network/service-worker/serviceWorker";
import { Provider as ReduxProvider } from "react-redux";
import GraphQLService from "./network/graphql.service";
import { ApolloProvider } from "@apollo/client";
import store from "./models/store";

const suppressedWarnings = [
  "React Router will begin wrapping state updates in `React.startTransition` in v7",
  "Relative route resolution within Splat routes is changing in v7",
];

const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  if (
    typeof args[0] === "string" &&
    suppressedWarnings.some((w) => args[0].includes(w))
  ) {
    return; // ignore
  }
  originalWarn(...args);
};
ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ApolloProvider client={GraphQLService}>
        <Router>
          <App dispatch={() => {}} />
        </Router>
      </ApolloProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register();
