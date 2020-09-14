import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import BoldText from "./BoldText";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const GridContainer = styled.div`
  margin-bottom: 36px;
  display: grid;
  grid-gap: 2%;
  grid-template-columns: repeat(5, 18.5%);
  grid-template-rows: 170px;
  grid-auto-rows: 170px;
`;

const Card = styled.div`
  ${(props) => props.theme.toneBox};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EAvatar = styled(Avatar)`
  display: inline-table;
  margin-bottom: 15px;
`;

const ELink = styled(Link)`
  margin-bottom: 10px;
`;

const EFollowButton = styled(FollowButton)`
  min-height: 36px;
`;

export default ({ userArray }) => {
  return (
    <GridContainer>
      {userArray.map((user) => {
        return (
          <UserCard
            key={user.id}
            id={user.id}
            username={user.username}
            isFollowing={user.isFollowing}
            isSelf={user.isSelf}
            url={user.avatar}
          />
        );
      })}
    </GridContainer>
  );
};

const UserCard = ({ id, username, isFollowing, url, isSelf }) => {
  return (
    <Card>
      <EAvatar url={url} size={"md"} />
      <ELink to={`/${username}`}>
        <BoldText text={username} />
      </ELink>
      {!isSelf && <EFollowButton id={id} isFollowing={isFollowing} />}
    </Card>
  );
};

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired
};
