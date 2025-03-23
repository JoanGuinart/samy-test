import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const API_URL = import.meta.env.VITE_SAMYROAD_API_URL;

const client = new ApolloClient({
  link: new HttpLink({
    uri: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          images: {
            keyArgs: false,
            merge(existing = { nodes: [], pageInfo: {} }, incoming) {
              return {
                nodes: [...(existing.nodes || []), ...incoming.nodes],
                pageInfo: incoming.pageInfo,
              };
            },
          },
        },
      },
    },
  }),
});

export default client;
