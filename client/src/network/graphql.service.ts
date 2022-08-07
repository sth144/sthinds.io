
import { 
  ApolloClient, InMemoryCache, HttpLink, 
  from 
} from "@apollo/client";
import { onError, ErrorResponse } from "@apollo/client/link/error" 

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
            console.error(`GraphQL error ${error.message}`);
          });
      }
    }), 
    new HttpLink({uri: `http://${serverHost}${serverPortStr}/graphql`})
  ]) 
});

export default GraphQLService; 
