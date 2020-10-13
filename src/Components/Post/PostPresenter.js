import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import "moment/locale/ko";
import BoldText from "../BoldText";
import Avatar from "../Avatar";
import { FullPaw, Paw, Bubble, Prev, Next } from "../Icons";
import TextareaAutosize from "react-autosize-textarea";
import Indicator from "../Indicator";
import Comments from "../../Components/Comments";
import SliceText from "../../Components/SliceText";
import PopUp from "../../Components/PopUp";

const Post = styled.div`
  ${(props) => props.theme.toneBox};
  width: 100%;
  max-width: 600px;
  user-select: none;
  margin-bottom: 30px;
  a {
    color: inherit;
  }
`;

const Header = styled.header`
  padding: 20px;
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

// -> slide
const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  z-index: 1;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const PostFile = styled.div`
  max-width: 100%;
  width: 100%;
  height: 600px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
  @media ${(props) => props.theme.mobile} {
    height: 100%;
    padding-top: 100%;
  }
`;

const ToggleSlide = styled.div`
  width: 100%;
  display: flex;
  margin-top: 290px;
  margin-bottom: 230px;
  @media ${(props) => props.theme.mobile} {
    margin-top: 0;
    margin-bottom: 100%;
  }
`;

const PrevButton = styled.div`
  z-index: 2;
  width: 50%;
  display: flex;
  justify-content: flex-start;
`;

const PrevAction = styled.div`
  cursor: pointer;
  margin-left: 10px;
  svg {
    fill: rgba(256, 256, 256, 1);
  }
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
`;

const NextButton = styled.div`
  z-index: 2;
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;

const NextAction = styled.div`
  cursor: pointer;
  margin-right: 10px;
  svg {
    fill: rgba(256, 256, 256, 1);
  }
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
`;

const SlideIndicator = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
    position: absolute;
    bottom: 10px;
  }
`;
// <- slide

const Button = styled.span`
  cursor: pointer;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 12px;
    }
  }
  margin-bottom: 10px;
`;

const Meta = styled.div`
  padding: 20px;
  svg {
    fill: ${(props) => props.theme.pink};
  }
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
  padding: 20px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-weight: normal;
  }
`;

const CommentsWrap = styled.div``;

const LikeSection = styled.div`
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.pink};
  }
`;

export default (props) => {
  // console.log("PostPresenter", props);
  const filesLength = props.files.length;
  const shortComment = [];
  let makeCommentsArray = props.comments;
  if (props.comments.length > 3) {
    shortComment.push(makeCommentsArray[0]);
    makeCommentsArray = shortComment;
  }
  return (
    <Post>
      <Header>
        <Avatar
          size="sm"
          url={props.user.avatar}
          username={props.user.username}
          link={true}
        />
        <UserColumn>
          <Link to={`/${props.user.username}`}>
            <BoldText text={props.user.username} />
          </Link>
          <Location>{props.location}</Location>
        </UserColumn>
      </Header>
      <Files>
        {props.files &&
          props.files.map((file, index) => (
            <PostFile
              key={file.id}
              src={file.url}
              showing={index === props.currentItem}
            >
              {filesLength > 1 && (
                <ToggleSlide>
                  {props.currentItem !== 0 ? (
                    <PrevButton>
                      <PrevAction onClick={() => props.nextSlideFn()}>
                        <Prev />
                      </PrevAction>
                    </PrevButton>
                  ) : (
                    <PrevButton />
                  )}
                  {props.currentItem + 1 !== filesLength ? (
                    <NextButton>
                      <NextAction onClick={() => props.nextSlideFn()}>
                        <Next />
                      </NextAction>
                    </NextButton>
                  ) : (
                    <NextButton />
                  )}
                </ToggleSlide>
              )}
              {filesLength > 1 && (
                <SlideIndicator>
                  <Indicator
                    countArray={props.files}
                    currentItem={props.currentItem}
                  />
                </SlideIndicator>
              )}
            </PostFile>
          ))}
      </Files>
      <Meta>
        <Buttons>
          <Button onClick={props.toggleLike}>
            {props.isLiked ? <FullPaw /> : <Paw />}
          </Button>
          <Button>
            <Link to={`/post/${props.id}`}>
              <Bubble />
            </Link>
          </Button>
        </Buttons>
        <LikeSection onClick={props.handleIsOpen}>
          <BoldText
            text={props.likeCount === 1 ? "1 paw" : `${props.likeCount} paws`}
          />
        </LikeSection>
        <Caption>
          <Link to={`/${props.user.username}`}>
            <BoldText text={props.user.username} />
          </Link>
          <SliceText text={props.caption} length={30} />
        </Caption>
        <Timestamp>
          <Moment fromNow>{props.createdAt}</Moment>
        </Timestamp>
        {props.comments.length > 3 ? (
          <CommentsWrap>
            <Comments commentsArray={makeCommentsArray} />
            <Link to={`/post/${props.id}`}>
              댓글 {props.comments.length}개 모두 보기
            </Link>
          </CommentsWrap>
        ) : (
          <CommentsWrap>
            <Comments commentsArray={makeCommentsArray} />
          </CommentsWrap>
        )}
        {props.comments && props.selfComments.length !== 0 ? (
          <CommentsWrap>
            <Comments commentsArray={props.selfComments} />
          </CommentsWrap>
        ) : null}
      </Meta>
      <Textarea
        placeholder={"댓글을 달아주세요 :-)"}
        value={props.newComment.value}
        onChange={props.newComment.onChange}
        onKeyPress={props.onKeyPress}
      />
      {props.isOpenLikes && (
        <PopUp
          title={"Likes"}
          togglePopFn={props.handleIsOpen}
          kind={"LIKE"}
          postId={props.id}
        />
      )}
    </Post>
  );
};
