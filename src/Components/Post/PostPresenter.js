import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import "moment/locale/ko";
import BoldText from "../BoldText";
import Avatar from "../Avatar";
import { FullPaw, Paw, Bubble } from "../Icons";
import TextareaAutosize from "react-autosize-textarea";

const Post = styled.div`
  ${(props) => props.theme.box};
  width: 100%;
  max-width: 600px;
  user-select: none;
  margin-bottom: 30px;
  a {
    color: inherit;
  }
`;

const Header = styled.header`
  padding: 18px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  max-width: 100%;
  width: 100%;
  height: 600px;
  position: absolute;
  top: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Button = styled.span`
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.blue};
  }
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Meta = styled.div`
  padding: 18px;
`;

const Caption = styled.div`
  margin: 10px 0;
  line-height: 1.2;
`;

const Timestamp = styled.span`
  font-weight: 400;
  display: block;
  font-size: 12px;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  color: ${(props) => props.theme.blue};
  padding: 18px;
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul``;

const CommentUser = styled(BoldText)`
  margin-right: 5px;
`;

const Comment = styled.li`
  margin-bottom: 3px;
  line-height: 1.2;
  &:first-child {
    margin-top: 13px;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

export default ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  caption,
  currentItem,
  newComment,
  onKeyPress,
  comments,
  selfComments
}) => (
  <Post>
    <Header>
      <Avatar size="sm" url={avatar} />
      <UserColumn>
        <Link to={`/${username}`}>
          <BoldText text={username} />
        </Link>
        <Location>{location}</Location>
      </UserColumn>
    </Header>
    <Files>
      {files &&
        files.map((file, index) => (
          <File
            key={file.id}
            id={file.id}
            src={file.url}
            showing={index === currentItem}
          />
        ))}
    </Files>
    <Meta>
      <Buttons>
        <Button>{isLiked ? <FullPaw /> : <Paw />}</Button>
        <Button>
          <Bubble />
        </Button>
      </Buttons>
      <BoldText text={likeCount === 1 ? "1 paw" : `${likeCount} paws`} />
      <Caption>
        <Link to={`/${username}`}>
          <BoldText text={username} />
        </Link>{" "}
        {caption}
      </Caption>
      <Timestamp>
        <Moment fromNow>{createdAt}</Moment>
      </Timestamp>
      {comments && (
        <Comments>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <Link to={`/${username}`}>
                <CommentUser text={comment.user.username} />
              </Link>
              {comment.text}
            </Comment>
          ))}
          {selfComments.map((comment) => (
            <Comment key={comment.id}>
              <Link to={`/${username}`}>
                <CommentUser text={comment.user.username} />
              </Link>
              {comment.text}
            </Comment>
          ))}
        </Comments>
      )}
    </Meta>
    <Textarea
      placeholder={"댓글을 달아주세요 :-)"}
      value={newComment.value}
      onChange={newComment.onChange}
      onKeyPress={onKeyPress}
    />
  </Post>
);
