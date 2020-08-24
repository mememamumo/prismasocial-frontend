import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import BoldText from "../../Components/BoldText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 44px;
`;

const Picture = styled.div`
  display: flex;
  margin-right: 30px;
  justify-content: center;
  width: 200px;
`;

const HeaderColumn = styled.div`
  flex: 1;
`;

const UsernameRow = styled.div`
  display: flex;
`;

const Username = styled.span`
  display: flex;
  font-size: 26px;
  font-weight: 700;
  margin-right: 16px;
`;

const EFollowButton = styled(FollowButton)`
  margin-top: 0;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 24px;
  }
`;

const FullName = styled(BoldText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0;
  line-height: 1.2;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: 230px;
  grid-auto-rows: 230px;
`;

const ProfilePresenter = ({
  loading,
  id,
  avatar,
  username,
  fullName,
  isFollowing,
  isSelf,
  bio,
  posts,
  followingCount,
  followersCount,
  postsCount
}) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Helmet>
          <title>{username} | Prismasocial</title>
        </Helmet>
        <Header>
          <Picture>
            <Avatar size="lg" url={avatar} />
          </Picture>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>
              {!isSelf && <EFollowButton isFollowing={isFollowing} id={id} />}
            </UsernameRow>
            <Counts>
              <Count>
                게시물 <BoldText text={String(postsCount)} />
              </Count>
              <Count>
                팔로워 <BoldText text={String(followersCount)} />
              </Count>
              <Count>
                팔로우 <BoldText text={String(followingCount)} />
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map((post) => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))}
        </Posts>
      </Wrapper>
    );
  }
};

export default ProfilePresenter;
