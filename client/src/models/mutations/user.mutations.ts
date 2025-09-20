import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const DELETE_PROFILE = gql`
  mutation deleteUser($_id: String!) {
    deleteUser(_id: $_id) {
      _id
    }
  }
`;
