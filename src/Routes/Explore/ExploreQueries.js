import { gql } from "apollo-boost";

export const EXPLORE = gql`
  query explore {
    explore {
      users {
        id
        avatar
        username
        bio
        isFollowing
        isSelf
      }
      posts {
        id
        commentCount
        likeCount
        files {
          id
          url
        }
        createdAt
      }
    }
  }
`;
