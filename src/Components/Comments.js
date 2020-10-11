import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import "moment-timezone";
import "moment/locale/ko";
import BoldText from "./BoldText";
import Avatar from "./Avatar";

const CommentContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 16px;
`;

const CommentWrapper = styled.li`
  width: 100%;
  // margin-bottom: 3px;
`;
const MetaRow = styled.div`
  width: 100%;
  padding: 7px 16px;
  display: flex;
  align-items: flex-start;
`;

const EMetaRow = styled(MetaRow)`
  padding: 0;
`;

const AvatarColumn = styled.div``;

const CommentColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  line-height: 1.2;
`;

const ECommentColumn = styled(CommentColumn)`
  margin: 0;
`;

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 3px;
`;
const Username = styled.span`
  margin-right: 5px;
`;

const Timestamp = styled.div`
  font-size: 12px;
`;

const Comments = ({ commentsArray, avatar = false }) => {
  // console.log("CommentsArray", commentsArray);
  if (avatar) {
    return (
      <CommentContainer>
        {commentsArray.map((comment) => {
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              isAvatar={comment.user.avatar}
              avatar={comment.user.avatar}
              username={comment.user.username}
              text={comment.text}
              createdAt={comment.createdAt}
            />
          );
        })}
      </CommentContainer>
    );
  } else {
    return (
      <CommentContainer>
        {commentsArray.map((comment) => {
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              username={comment.user.username}
              text={comment.text}
              createdAt={comment.createdAt}
            />
          );
        })}
      </CommentContainer>
    );
  }
};

Comments.propTypes = {
  commentsArray: PropTypes.array.isRequired
};

const Comment = (props) => {
  // console.log("Comment", props);

  if (props.isAvatar) {
    return (
      <CommentWrapper>
        <MetaRow>
          <AvatarColumn>
            <Avatar
              size="sm"
              url={props.avatar}
              username={props.username}
              link={true}
            />
          </AvatarColumn>
          <CommentColumn>
            <Wrap>
              <Username>
                <Link to={`/${props.username}`}>
                  <BoldText text={props.username} />
                </Link>
              </Username>
              {props.text}
            </Wrap>
            <Timestamp>
              <Moment fromNow>{props.createdAt}</Moment>
            </Timestamp>
          </CommentColumn>
        </MetaRow>
      </CommentWrapper>
    );
  } else {
    return (
      <CommentWrapper>
        <EMetaRow>
          <ECommentColumn>
            <Wrap>
              <Username>
                <Link to={`/${props.username}`}>
                  <BoldText text={props.username} />
                </Link>
              </Username>
              {props.text}
            </Wrap>
          </ECommentColumn>
        </EMetaRow>
      </CommentWrapper>
    );
  }
};

export default Comments;
