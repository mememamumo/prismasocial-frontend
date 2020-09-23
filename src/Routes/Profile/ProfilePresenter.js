import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import BoldText from "../../Components/BoldText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import PopUp from "../../Components/PopUp";
import { More } from "../../Components/Icons";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const ProfileBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 60px;
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
  margin: 0;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0;
`;

const PostCount = styled.li`
  margin-right: 24px;
`;
const FollowersCount = styled.li`
  cursor: pointer;
  margin-right: 24px;
`;
const FollowingsCount = styled.li`
  cursor: pointer;
`;

const Count = styled.div`
  font-size: 17px;
`;

const FullName = styled(BoldText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0;
  line-height: 1.2;
`;

const Posts = styled.div``;

const Setting = styled.div`
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.blue};
    opacity: 0.6;
  }
  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const ProfilePresenter = ({
  loading,
  data,
  isOpenFollowers,
  isOpenFollowing,
  isOpenSetting,
  toggleFollowers,
  toggleFollowing,
  toggleSetting
}) => {
  // console.log(seeUser); //undefined
  // console.log(data);
  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        !loading &&
        data.seeUser &&
        data.seeUser.posts && (
          <ProfileBox>
            <Helmet>
              <title>{data.seeUser.username} | Prismasocial</title>
            </Helmet>
            <Header>
              <Picture>
                <Avatar
                  size="lg"
                  url={data.seeUser.avatar}
                  username={data.seeUser.username}
                />
              </Picture>
              <HeaderColumn>
                <UsernameRow>
                  <Username>{data.seeUser.username}</Username>
                  {data.seeUser.isSelf ? (
                    <Setting onClick={toggleSetting}>
                      <More />
                    </Setting>
                  ) : (
                    <EFollowButton
                      id={data.seeUser.id}
                      isFollowing={data.seeUser.isFollowing}
                    />
                  )}
                </UsernameRow>
                <Counts>
                  <PostCount>
                    <Count>
                      게시물 <BoldText text={String(data.seeUser.postsCount)} />
                    </Count>
                  </PostCount>
                  <FollowersCount onClick={toggleFollowers}>
                    <Count>
                      팔로워{" "}
                      <BoldText text={String(data.seeUser.followersCount)} />
                    </Count>
                  </FollowersCount>
                  <FollowingsCount onClick={toggleFollowing}>
                    <Count>
                      팔로우{" "}
                      <BoldText text={String(data.seeUser.followingCount)} />
                    </Count>
                  </FollowingsCount>
                </Counts>
                <FullName text={data.seeUser.fullName} />
                <Bio>{data.seeUser.bio}</Bio>
              </HeaderColumn>
            </Header>
            <Posts>
              <SquarePost postArray={data.seeUser.posts} />
            </Posts>
          </ProfileBox>
        )
      )}
      {isOpenFollowers && (
        <PopUp
          title={"Followers"}
          kind={"FOLLOW"}
          togglePopFn={toggleFollowers}
          data={data.seeUser.followers}
        />
      )}
      {isOpenFollowing && (
        <PopUp
          title={"Following"}
          kind={"FOLLOW"}
          togglePopFn={toggleFollowing}
          data={data.seeUser.following}
        />
      )}
      {isOpenSetting && (
        <PopUp
          title={"Setting"}
          kind={"SETTING"}
          togglePopFn={toggleSetting}
          data={data.seeUser}
        />
      )}
    </Wrapper>
  );
};

ProfilePresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object
};

export default ProfilePresenter;
