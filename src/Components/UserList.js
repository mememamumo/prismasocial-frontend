import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

const Row = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 15px;
  align-items: flex-start;
  justify-content: center;
`;

const AvatarColumn = styled.div`
  margin-right: 15px;
`;

const InfoColumn = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

const Username = styled.div`
  font-weight: bold;
`;

const Bio = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.lightGreyColor};
  margin-top: 5px;
  margin-right: 20px;
`;

const ButtonColumn = styled.div`
  display: flex;
  align-self: center;
`;

const EFollowButton = styled(FollowButton)`
  margin: 5px 0 0 0;
  padding: 4px 6px;
`;

const UserList = ({ users, filtering = false }) => {
  console.log(users);
  const filteringArray = [];

  if (filtering) {
    users.forEach(async (element) => await filteringArray.push(element.user));
    return (
      <>
        {filteringArray.map((user) => {
          return (
            <Row key={user.id}>
              <AvatarColumn>
                <Avatar
                  size="sm"
                  username={user.username}
                  url={user.avatar}
                  link={true}
                />
              </AvatarColumn>
              <InfoColumn>
                <Username>
                  <Link to={`${user.username}`}>{user.username}</Link>
                </Username>
                {user.bio.length > 0 ? (
                  <Bio>{user.bio.slice(0, 25) || user.fullName}</Bio>
                ) : (
                  ""
                )}
              </InfoColumn>
              <ButtonColumn>
                {!user.isSelf && (
                  <EFollowButton id={user.id} isFollowing={user.isFollowing} />
                )}
              </ButtonColumn>
            </Row>
          );
        })}
      </>
    );
  }
};

export default UserList;
