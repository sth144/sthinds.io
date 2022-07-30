import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
  query($email: String!) {
    getUserByEmail(email: $email) {
      _id
      email
      firstName
      lastName
    }
  }
`