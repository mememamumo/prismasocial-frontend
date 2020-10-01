import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";

const LoadingWrapper = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UserColumn = styled.div`
  padding: 0 15px 15px;
  display: flex;
  flex-direction: column;
`;

const MetaLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const MetaAll = styled.span`
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
`;

const PostColumn = styled.div`
  padding: 0 15px 0;
  display: flex;
  flex-direction: column;
`;

const ExplorePresenter = ({ data, loading }) => {
  if (loading) {
    return (
      <LoadingWrapper>
        <Loader />
      </LoadingWrapper>
    );
  } else {
    // console.log(data.explore.users);
    // console.log(data);

    const users = data.explore.users;
    const posts = data.explore.posts;
    let hiddenUser = [];

    if (users.length > 5) {
      hiddenUser.push(users[0], users[1], users[2], users[3], users[4]);
    } else {
      hiddenUser = users;
    }
    return (
      <ContentWrapper>
        <Helmet>
          <title>Explore | Prismasocial</title>
        </Helmet>
        <UserColumn>
          {users.length > 4 ? (
            <MetaLine>
              <MetaAll>
                <Link to={`/explore/users`}>더 보기</Link>
              </MetaAll>
            </MetaLine>
          ) : null}
          {users.length === 0 ? null : <UserCard userArray={hiddenUser} />}
        </UserColumn>
        <PostColumn>
          <SquarePost postArray={posts} />
        </PostColumn>
      </ContentWrapper>
    );
  }
};

export default ExplorePresenter;
