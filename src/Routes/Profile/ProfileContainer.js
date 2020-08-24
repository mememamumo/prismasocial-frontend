import React from "react";
import { withRouter } from "react-router-dom/";
import { useQuery } from "react-apollo-hooks";
import { GET_USER } from "./ProfileQueries";
import ProfilePresenter from "./ProfilePresenter";
import Loader from "../../Components/Loader";

export default withRouter(
  ({
    match: {
      params: { username }
    }
  }) => {
    const { data, loading } = useQuery(GET_USER, { variables: { username } });
    if (loading === true) {
      return <Loader />;
    } else if (!loading && data && data.seeUser) {
      const {
        seeUser: {
          id,
          username,
          avatar,
          fullName,
          isFollowing,
          bio,
          followingCount,
          followersCount,
          postsCount,
          isSelf,
          posts
        }
      } = data;
      return (
        <ProfilePresenter
          id={id}
          loading={loading}
          avatar={avatar}
          username={username}
          fullName={fullName}
          isFollowing={isFollowing}
          isSelf={isSelf}
          bio={bio}
          followingCount={followingCount}
          followersCount={followersCount}
          postsCount={postsCount}
          posts={posts}
        />
      );
    } else {
      return null;
    }
  }
);
