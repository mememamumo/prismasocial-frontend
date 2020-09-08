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
import Comments from "../../Components/Comments";
import FollowButton from "../../Components/FollowButton";
import { Paw, Bubble, FullPaw, Prev, Next } from "../../Components/Icons";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const PostBox = styled.div`
  display: flex;
  ${(props) => props.theme.toneBox};
  width: 100%;
  height: 600px;
  user-select: none;
  a {
    color: inherit;
  }
`;

// -> slide
const Files = styled.div`
  position: relative;
  width: 600px;
  padding-bottom: 100%;
  display: flex;
  z-index: 1;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const PostFile = styled.div`
  width: 600px;
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

const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

const MetaHeader = styled.div`
  width: 100%;
  height: 72px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.opacityBlue};
`;

const Username = styled.span`
  margin-left: 10px;
`;

const EFollowButton = styled(FollowButton)`
  display: flex;
  margin: 0;
  margin-left: 15px;
  margin-top: 3px;
  padding: 3px 6px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const MetaCaption = styled.div`
  width: 100%;
  min-height: 90px;
  padding: 15px 16px;
  display: flex;
  align-items: flex-start;
`;

const AvatarRow = styled.div`
  display: flex;
`;

const CaptionRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Row = styled.div`
  width: 100%;
`;

const Caption = styled.div`
  margin: 10px 0;
  line-height: 1.2;
  margin-left: 10px;
`;

const Timestamp = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 400;
  margin-left: 10px;
`;

const MetaComment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MetaAction = styled.div`
  width: 100%;
  margin-bottom: 13px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${(props) => props.theme.opacityBlue};
`;

const Button = styled.span`
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;
`;

const ActionSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  width: 100%;
  min-height: 40px;
  ${Button} {
    &:first-child {
      margin-right: 12px;
    }
  }
  svg {
    fill: ${(props) => props.theme.pink};
  }
`;

const MetaAddComment = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const LikeSection = styled.div`
  margin-bottom: 9px;
`;

const ETimestamp = styled(Timestamp)`
  margin-left: 0;
`;

const AddCommentSection = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  max-height: 80px;
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

const MetaScroll = styled.div`
  // scoll bar
  overflow-y: scroll;
  -ms-overflw-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  //
  padding-bottom: 150px;
`;

const MetaBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.bgLightGreyColor};
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
            <Avatar
              size="sm"
              username={props.user.username}
              url={props.user.avatar}
              link={true}
            />
            <Username>
              <Link to={`/${props.user.username}`}>
                <BoldText text={props.user.username} />
              </Link>
            </Username>
            {props.user.isSelf ? null : (
              <EFollowButton
                id={props.id}
                isFollowing={props.user.isFollowing}
              />
            )}
          </MetaHeader>
          <MetaScroll>
            <MetaCaption>
              <AvatarRow>
                <Avatar
                  size="sm"
                  username={props.user.username}
                  url={props.user.avatar}
                  link={true}
                />
              </AvatarRow>
              <CaptionRow>
                <Row>
                  <UserColumn>
                    <Link to={`/${props.user.username}`}>
                      <BoldText text={props.user.username} />
                    </Link>
                    <Location>{props.location}</Location>
                  </UserColumn>
                  <Caption>{props.caption}</Caption>
                </Row>
                <Timestamp>
                  <Moment fromNow>{props.createdAt}</Moment>
                </Timestamp>
              </CaptionRow>
            </MetaCaption>
            <MetaComment>
              <Comments commentsArray={props.comments} avatar={true} />
              <Comments commentsArray={props.selfComments} avatar={true} />
            </MetaComment>
          </MetaScroll>
          <MetaBottom>
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
              <ETimestamp>
                <Moment format="YYYY/MM/DD">{props.createdAt}</Moment>
              </ETimestamp>
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
          </MetaBottom>
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
