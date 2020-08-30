import { gql } from "apollo-boost";

export const ME = gql`
  {
    me {
      username
      avatar
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export const WHO_LIKES = gql`
  query whoLike($postId: String!) {
    whoLike(postId: $postId) {
      user {
        id
        username
        avatar
        fullName
        bio
        isSelf
        isFollowing
      }
    }
  }
`;

export const NOTIFICATION = gql`
  query seeNotification($username: String!) {
    seeNotification(username: $username) {
      id
      createdAt
      from {
        id
        avatar
        username
        isFollowing
      }
      to {
        id
        avatar
        username
      }
      type
      post {
        id
        files {
          id
          url
        }
      }
    }
  }
`;
