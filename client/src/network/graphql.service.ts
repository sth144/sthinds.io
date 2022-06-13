
import { 
  ApolloClient, InMemoryCache, HttpLink, 
  from 
} from "@apollo/client";
import { onError, ErrorResponse } from "@apollo/client/link/error" 

// TODO: separate this client instance to it's own file and inject
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
    new HttpLink({uri: "http://localhost:8000/graphql"})
  ]) 
});

export default GraphQLService; 
