import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app';
import { Provider } from 'react-redux';
import store from 'models/store';

test('renders', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>);
  const linkElement = screen.getByText(/Sean Hinds/i);
  expect(linkElement).toBeInTheDocument();
});
