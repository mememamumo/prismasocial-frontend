import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useMutation, useQuery } from "react-apollo-hooks";
import { LOG_OUT, WHO_LIKES } from "../SharedQueries";
import { Link } from "react-router-dom";
import { X } from "./Icons";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";
import Loader from "./Loader";
import UserList from "./UserList";

const PopUpContainer = styled.div`
  position: fixed;
  z-index: 1500;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Box = styled.div`
  ${(props) => props.theme.toneBox};
  width: ${(props) =>
    props.kind === "FOLLOW"
      ? "500px"
      : props.kind === "NOTIFICATION"
      ? "500px"
      : "400px"};
  min-height: 300px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: ${(props) => props.theme.boxBorder};
`;

const TitleBox = styled.div`
  display: flex;
  width: 90%;
  margin-left: 35px;
  justify-content: center;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const CloseBox = styled.div`
  display: flex;
  justify-content: center;
  width: 10%;
`;

const XButton = styled.div`
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.blue};
  }
`;

const Main = styled.div`
  width: 100%;
  padding: ${(props) => (props.kind === "SETTING" ? "" : "10px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SettingRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:active {
    background-color: ${(props) => props.theme.opacityBlue};
  }
  &:first-child {
    border-top: 1px solid ${(props) => props.theme.opacityBlue};
  }
  height: 50px;
  border-bottom: 1px solid ${(props) => props.theme.opacityBlue};
`;

const SettingText = styled.span`
  font-size: 16px;
  color: ${(props) => props.theme.blue};
`;

const UserRow = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 15px;
  align-items: center;
  justify-content: center;
`;

const AvatarField = styled.div`
  margin-right: 15px;
`;

const InfoField = styled.div`
  width: 100%;
  display: flex;
`;

const NameField = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const Bio = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.lightGreyColor};
  margin-top: 5px;
  margin-right: 20px;
`;

const ButtonField = styled.div`
  display: flex;
  align-items: center;
`;

const EFollowButton = styled(FollowButton)`
  margin: 5px 0 0 0;
  padding: 4px 6px;
`;

const PopUp = ({ togglePopFn, kind, title, data, postId }) => {
  const { data: whoLikesData, loading: whoLikesLoading } = useQuery(WHO_LIKES, {
    skip: postId === undefined,
    variables: { postId }
  });
  // console.log(whoLikesData, whoLikesLoading);

  const [logOutMutation] = useMutation(LOG_OUT);
  const logOutClick = () => {
    togglePopFn();
    logOutMutation();
  };

  const kindEnum = ["FOLLOW", "SETTING", "OPTION", "NOTIFICATION", "LIKE"];
  return (
    <PopUpContainer>
      <Box kind={kind}>
        <Header>
          <TitleBox>
            <Title>{title}</Title>
          </TitleBox>
          <CloseBox>
            <XButton onClick={togglePopFn}>
              <X />
            </XButton>
          </CloseBox>
        </Header>
        <Main kind={kind}>
          {kind === kindEnum[0] &&
            data.map((user) => {
              return (
                <UserRow key={user.id}>
                  <AvatarField>
                    <Link onClick={togglePopFn} to={`${user.username}`}>
                      <Avatar
                        size="md"
                        url={user.avatar}
                        username={user.username}
                      />
                    </Link>
                  </AvatarField>
                  <InfoField>
                    <NameField>
                      <Name>
                        <Link onClick={togglePopFn} to={`${user.username}`}>
                          {user.username}
                        </Link>
                      </Name>
                      {user.bio.length > 0 ? (
                        <Bio>{user.bio.slice(0, 35)}...</Bio>
                      ) : (
                        ""
                      )}
                    </NameField>
                    <ButtonField>
                      {!user.isSelf && (
                        <EFollowButton
                          id={user.id}
                          isFollowing={user.isFollowing}
                        />
                      )}
                    </ButtonField>
                  </InfoField>
                </UserRow>
              );
            })}
          {kind === kindEnum[1] && (
            <>
              <SettingRow onClick={logOutClick}>
                <SettingText>Log Out</SettingText>
              </SettingRow>
              <SettingRow onClick={() => console.log("Edit")}>
                <SettingText>Edit Profile</SettingText>
              </SettingRow>
            </>
          )}
          {kind === kindEnum[4] ? (
            whoLikesLoading ? (
              <UserRow>
                <Loader />
              </UserRow>
            ) : (
              !whoLikesLoading &&
              whoLikesData && (
                <UserList users={whoLikesData.whoLike} filtering={true} />
              )
            )
          ) : null}
        </Main>
      </Box>
    </PopUpContainer>
  );
};

PopUp.propTypes = {
  togglePopFn: PropTypes.func.isRequired,
  kind: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.any
};

export default PopUp;
