import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
// import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'isomorphic-unfetch';
// import * as ws from 'ws';

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.

  const httpLink = new HttpLink({
    uri: process.env.API_ENDPOINT, // Server URL (must be absolute)
    headers: {
      'x-hasura-admin-secret': process.env.API_KEY,
    },
  });

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: process.env.API_WS_ENDPOINT,
        options: {
          reconnect: true,
          lazy:true,
          connectionParams: {
            headers: {
              'x-hasura-admin-secret': process.env.API_KEY,
            },
          },
        },
      })
    : null;

  const link = process.browser
    ? split(
        // split based on operation type
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link,
    cache: new InMemoryCache().restore(initialState),
  });
}
