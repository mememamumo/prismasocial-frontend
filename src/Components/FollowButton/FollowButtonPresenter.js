import React from "react";
import styled from "styled-components";
import Button from "../Button";

const EButton = styled(Button)`
  padding: 5px 10px;
  ${(props) =>
    props.isFollowing ? props.theme.unfollowBtn : props.theme.followBtn};
`;

export default ({ isFollowing, onClick, className }) => (
  <EButton
    isFollowing={isFollowing}
    text={isFollowing ? "Unfollow" : "Follow"}
    onClick={onClick}
    className={className}
  />
);
