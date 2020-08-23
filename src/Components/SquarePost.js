import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FullPaw, FullBubble } from "./Icons";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s linear;
  svg {
    fill: #ffffff;
  }
`;

const Container = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  cursor: pointer;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const Number = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 25px;
  }
`;

const NumberText = styled.div`
  margin-left: 10px;
  font-size: 18px;
  font-weight: 500;
`;

const SquarePost = ({ likeCount, commentCount, file }) => (
  <Container bg={file.url}>
    <Overlay>
      <Number>
        <FullPaw size={21} />
        <NumberText>{likeCount}</NumberText>
      </Number>
      <Number>
        <FullBubble size={19} />
        <NumberText>{commentCount}</NumberText>
      </Number>
    </Overlay>
  </Container>
);

SquarePost.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  file: PropTypes.object.isRequired
};

export default SquarePost;
