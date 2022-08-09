
import { 
  ApolloClient, InMemoryCache, HttpLink, 
  from 
} from "@apollo/client";
import { onError, ErrorResponse } from "@apollo/client/link/error" 

const serverProtocol = window.location.protocol;
const serverHost = window.location.hostname;
const serverPortStr = serverHost.includes("localhost") 
                    ? ":8000" : "";

const GraphQLService = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    onError((errorResponse: ErrorResponse) => {
      if (errorResponse.graphQLErrors) {
        errorResponse.graphQLErrors
          .forEach((error) => {
            alert(`GraphQL error ${error.message}`);
          });
      }
    }), 
    new HttpLink({uri: `${serverProtocol}//${serverHost}${serverPortStr}/graphql`})
  ]) 
});

export default GraphQLService; 
