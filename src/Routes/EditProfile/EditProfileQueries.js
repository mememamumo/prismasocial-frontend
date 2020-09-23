import { gql } from "apollo-boost";

export const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      username
      email
      firstName
      lastName
      bio
      avatar
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation editUser(
    $username: String
    $firstName: String
    $lastName: String
    $bio: String
    $avatar: String
  ) {
    editUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      bio: $bio
      avatar: $avatar
    ) {
      username
    }
  }
`;
