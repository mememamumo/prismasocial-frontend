import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FullPaw, FullBubble, Many } from "./Icons";

const GridContainer = styled.div`
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 300px;
  grid-auto-rows: 300px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
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
  position: relative;
  width: 100%;
  height: 100%;
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

const BookMarkOverlay = styled.div`
  z-index: 300px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  svg {
    fill: white;
    float: right;
    margin: 16px 16px 0 0;
  }
`;

const SquarePost = ({ postArray }) => {
  return (
    <GridContainer>
      {postArray.map((post) => {
        return (
          <MapToPost
            key={post.id}
            id={post.id}
            commentCount={post.commentCount}
            likeCount={post.likeCount}
            file={post.files[0]}
            fileLength={post.files.length}
          />
        );
      })}
    </GridContainer>
  );
};

const MapToPost = ({ id, likeCount, commentCount, file, fileLength }) => {
  return (
    <Link to={`/post/${id}`}>
      <Container bg={file.url}>
        {fileLength > 1 && (
          <BookMarkOverlay>
            <Many size={24} />
          </BookMarkOverlay>
        )}
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
    </Link>
  );
};

SquarePost.propTypes = {
  postArray: PropTypes.array
};

export default SquarePost;
