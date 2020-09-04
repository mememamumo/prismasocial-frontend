import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "../../Components/Avatar";
import TextareaAutosize from "react-autosize-textarea";
import Moment from "react-moment";
import "moment-timezone";
import "moment/locale/ko";
import Indicator from "../../Components/Indicator";
import PopUp from "../../Components/PopUp";
import BoldText from "../../Components/BoldText";
import { Paw, Bubble, FullPaw, Prev, Next } from "../../Components/Icons";

const Wrapper = styled.div``;

const PostBox = styled.div`
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
`;

const ToggleSlide = styled.div`
  width: 100%;
  display: flex;
  margin-top: 290px;
  margin-bottom: 230px;
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

const MetaContainer = styled.div``;

const MetaHeader = styled.div``;

const MetaCaption = styled.div``;

const MetaComment = styled.div``;

const MetaAction = styled.div``;

const MetaAddComment = styled.div``;

const Username = styled.span``;

const AvatarRow = styled.div``;

const CaptionRow = styled.div``;
const Row = styled.div``;

const ActionSection = styled.div`
  svg {
    fill: ${(props) => props.theme.pink};
  }
`;

const LikeSection = styled.div``;

const AddCommentSection = styled.div``;

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

export default (props) => {
  console.log("SeePostPresenter", props);
  const filesLength = props.files.length;
  return (
    <Wrapper>
      <PostBox>
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
        <MetaContainer>
          <MetaHeader>
            <Avatar size="sm" url={props.user.avatar} />
            <Username>
              <Link to={`/${props.user.username}`}>
                <BoldText text={props.user.username} />
              </Link>
            </Username>
          </MetaHeader>
          <MetaCaption>
            <AvatarRow>
              <Avatar size="sm" url={props.user.avatar} />
            </AvatarRow>
            <CaptionRow>
              <Row>
                <Username>
                  <Link to={`/${props.user.username}`}>
                    <BoldText text={props.user.username} />
                  </Link>
                </Username>
                <Caption>{props.caption}</Caption>
              </Row>
              <Timestamp>
                <Moment fromNow>{props.createdAt}</Moment>
              </Timestamp>
            </CaptionRow>
          </MetaCaption>
          <MetaComment>
            {/* {props.comments && (
              <Comments>
                {props.comments.map((comment) => (
                  <Comment key={comment.id}>
                    <Link to={`/${props.user.username}`}>
                      <CommentUser text={comment.user.username} />
                    </Link>
                    {comment.text}
                  </Comment>
                ))}
                {props.selfComments.map((comment) => (
                  <Comment key={comment.id}>
                    <Link to={`/${props.username}`}>
                      <CommentUser text={comment.user.username} />
                    </Link>
                    {comment.text}
                  </Comment>
                ))}
              </Comments>
            )} */}
          </MetaComment>
          <MetaAction>
            <ActionSection>
              <Button onClick={props.toggleLike}>
                {props.isLiked ? <FullPaw /> : <Paw />}
              </Button>
              <Button>
                <Bubble />
              </Button>
            </ActionSection>
            <LikeSection>
              <BoldText
                text={
                  props.likeCount === 1 ? "1 paw" : `${props.likeCount} paws`
                }
                onClick={props.handleIsOpen}
              ></BoldText>
            </LikeSection>
            <Timestamp>
              <Moment fromNow>{props.createdAt}</Moment>
            </Timestamp>
          </MetaAction>
          <MetaAddComment>
            <AddCommentSection>
              <Textarea
                placeholder={"댓글을 달아주세요 :-)"}
                value={props.newComment.value}
                onChange={props.newComment.onChange}
                onKeyPress={props.onKeyPress}
              />
            </AddCommentSection>
          </MetaAddComment>
        </MetaContainer>
      </PostBox>
      {props.isOpenLikes && (
        <PopUp
          title={"Likes"}
          togglePopFn={props.handleIsOpen}
          kind={"LIKE"}
          postId={props.id}
        />
      )}
    </Wrapper>
  );
};
