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

export const TIMELINE_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
    explore {
      users {
        id
        avatar
        username
        bio
        isFollowing
        isSelf
      }
    }
  }
`;
