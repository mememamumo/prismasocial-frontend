import { gql } from "apollo-boost";

export const SEE_LIKE = gql`
  query {
    seeLike {
      id
      readCheck
      user {
        id
        username
        avatar
      }
      post {
        id
        files {
          id
          url
        }
      }
      createdAt
    }
  }
`;

export const READ_LIKE = gql`
  mutation readLike($likeId: String!) {
    readLike(likeId: $likeId)
  }
`;
