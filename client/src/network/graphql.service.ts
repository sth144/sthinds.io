import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError, ErrorResponse } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

const serverProtocol = window.location.protocol;
const serverHost = window.location.hostname;
const serverPortStr = serverHost.includes("localhost") ? ":3200" : "";

const httpLink = new HttpLink({
  uri: `${serverProtocol}//${serverHost}${serverPortStr}/graphql`,
});

const authLink = setContext((_: unknown, { headers }: any) => {
  let appState: { authentication: { token: string } } | string =
    localStorage.getItem("appState") as string;
  let token = null;
  if (appState) {
    try {
      appState = JSON.parse(appState) as unknown as {
        authentication: { token: string };
      };
      token = appState?.authentication?.token;
    } catch (error) {
      console.error("Error parsing appState:", error);
    }
  }

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const GraphQLService = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach((err) =>
          console.error(`GraphQL error: ${err.message}`)
        );
      if (networkError) console.error(networkError);
    }),
    authLink.concat(httpLink),
  ]),
});

export default GraphQLService;
