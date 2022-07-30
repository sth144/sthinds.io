import { gql } from "@apollo/client";

export const GET_AUTHOR_INFO = gql`
  query($authorID: String!) {
    user(_id: $authorID) {
      _id
      email
      firstName
      lastName
    }
  }
`