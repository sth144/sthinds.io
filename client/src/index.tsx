import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app';
import reportWebVitals from './network/service-worker/reportWebVitals';
import * as serviceWorker from "./network/service-worker/serviceWorker";
import { Provider } from "react-redux";
import store from "./models/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register();
