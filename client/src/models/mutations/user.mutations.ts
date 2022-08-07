import { gql } from "@apollo/client";

export const DELETE_PROFILE = gql`
  mutation deleteUser(
    $_id: String!
  ) {
    deleteUser(
      _id: $_id
    ) {
      _id
    }
  }
`;