import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import UserCard from "../Components/UserCard";
// import { EXPLORE } from "../Routes/Explore/ExploreQueries";

const TIMELINE_QUERY = gql`
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserColumn = styled.div``;

export default () => {
  const { data, loading } = useQuery(TIMELINE_QUERY);
  const users = data && data.explore.users;
  let hiddenUser = [];

  if (data && data.explore.users.length > 5) {
    hiddenUser.push(users[0], users[1], users[2], users[3], users[4]);
  } else {
    hiddenUser = users;
  }

  console.log(data);
  console.log(data && data.explore.users);
  return (
    <>
      <Wrapper>
        <Helmet>
          <title>Timeline | Prismasocial</title>
        </Helmet>
        {loading && <Loader />}
        {!loading &&
          data &&
          data.seeFeed &&
          data.seeFeed.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              user={post.user}
              files={post.files}
              likeCount={post.likeCount}
              isLiked={post.isLiked}
              comments={post.comments}
              createdAt={post.createdAt}
              caption={post.caption}
              location={post.location}
            />
          ))}
      </Wrapper>
      <UserColumn>
        {!loading && data.seeFeed.length === 0 && (
          <UserCard userArray={hiddenUser} />
        )}
      </UserColumn>
    </>
  );
};
