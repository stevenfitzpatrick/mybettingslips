import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Theme } from '@sfitzpatrick/fitzy';
import { ThemeProvider } from 'styled-components';

import App from './components/App';
import ToastProvider from './components/providers/ToastProvider';
import { fetchItem } from './utils';
import { USER_TOKEN_KEY } from './client';
import './styles/main';

const cache = new InMemoryCache();

/**
 * Set up Auth forwarding header on each request
 */
const authLink = new ApolloLink((operation, forward) => {
  const token = fetchItem(USER_TOKEN_KEY);
  const authorization = token ? `Bearer ${token}` : null;
  operation.setContext(() => ({
    headers: {
      authorization
    }
  }));
  return forward(operation);
});

/**
 * Set up ApolloClient
 */
const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({
      uri: 'https://api.graph.cool/simple/v1/cjcgptgo157pr01902z5vbkis'
    })
  ]),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={Theme}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('app')
);

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
