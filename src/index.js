import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

import App from './components/App';
import { fetchItem } from './utils';
import { USER_TOKEN_KEY } from './client';
import './styles/main.scss';

const cache = new InMemoryCache();

export const defaults = {
    networkStatus: {
        __typename: 'NetworkStatus',
        isConnected: false
    }
};

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

const stateLink = withClientState({
    cache,
    resolvers: {
        Mutation: {
            updateNetworkStatus: (_, { isConnected }, { cache }) => {
                const data = {
                    networkStatus: { isConnected }
                };
                cache.writeData({ data });
            }
        }
    },
    defaults
});

// Set up Apollo Client
const client = new ApolloClient({
    link: ApolloLink.from([
        stateLink,
        authLink,
        new HttpLink({
            uri: 'https://api.graph.cool/simple/v1/cjcgptgo157pr01902z5vbkis'
        })
    ]),
    cache
});

export const ThemeContext = createContext({
    background: 'yellow'
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('app')
);
