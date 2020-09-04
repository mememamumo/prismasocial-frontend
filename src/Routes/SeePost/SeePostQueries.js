import { gql } from "apollo-boost";

export const SEE_POST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      id
      user {
        id
        username
        avatar
        isSelf
      }
      location
      caption
      isLiked
      likeCount
      commentCount
      createdAt
      files {
        id
        url
      }
      comments {
        id
        text
        createdAt
        user {
          id
          username
          avatar
        }
      }
      likes {
        id
        user {
          id
          username
          avatar
        }
      }
    }
  }
`;
