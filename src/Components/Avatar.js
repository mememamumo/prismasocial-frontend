import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const getSize = (size) => {
  let number;
  if (size === "sm") {
    number = 30;
  } else if (size === "md") {
    number = 50;
  } else if (size === "lg") {
    number = 150;
  }
  return `
		width: ${number}px;
		height: ${number}px;
	`;
};

const Image = styled.div`
  ${(props) => getSize(props.size)}
  background-image: url(${(props) => props.url});
  background-size: cover;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.gray};
  background-color: ${(props) => props.theme.bgLightGreyColor};
`;

const Avatar = ({ size = "sm", url, className, username, link = true }) => {
  return link ? (
    <Link to={`/${username}`}>
      <Image
        className={className}
        size={size}
        url={url}
        alt={`${username}님의 프로필 사진`}
      />
    </Link>
  ) : (
    <Image
      className={className}
      size={size}
      url={url}
      alt={`${username}님의 프로필 사진`}
    />
  );
};

Avatar.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  url: PropTypes.string.isRequired,
  username: PropTypes.string,
  link: PropTypes.bool
};

export default Avatar;
