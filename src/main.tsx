import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import "@styles/global.scss";
import App from "./App.tsx";
import client from "@graphql/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
