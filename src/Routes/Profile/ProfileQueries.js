import { gql } from "apollo-boost";

export const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      fullName
      isFollowing
      isSelf
      bio
      following {
        id
        isSelf
        username
        bio
        isFollowing
        avatar
      }
      followingCount
      followers {
        id
        isSelf
        username
        bio
        isFollowing
        avatar
      }
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;
