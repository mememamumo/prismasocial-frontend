import React from "react";
import styled from "styled-components";
import Moment from "react-moment";
import "moment-timezone";
import "moment/locale/ko";
import { Paw } from "../Icons";
import Avatar from "../Avatar";
import BoldText from "../BoldText";
import Loader from "../Loader";

const Container = styled.div`
  position: relative;
`;

const LoaderContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const NotifiWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: -5px;
  width: 310px;
  height: 260px;
  ${(props) => props.theme.toneBox};
  border: 3px solid ${(props) => props.theme.bgPinkColor};
  &::after,
  &::before {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &::after {
    left: 299px;
    border-color: rgba(0, 0, 0, 0);
    border-bottom-color: ${(props) => props.theme.bgPinkColor};
    border-width: 13px;
    margin-left: -23px;
  }
  &::before {
    left: 299px;
    border-color: rgba(230, 230, 230, 0);
    border-width: 10px;
    margin-left: -10px;
  }
`;

const NotiScroll = styled.div`
  overflow-y: scroll;
  height: inherit;
`;

const NotifiContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  min-height: 53px;
  padding: 10px 10px;
  &:hover {
    background-color: ${(props) => props.theme.opacityBlue};
  }
`;

const EAvatar = styled(Avatar)``;

const NotifiInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  &:hover {
    text-decoration: underline;
  }
`;

const Text = styled.div`
  margin-left: 10px;
  text-align: left;
  width: calc(100% - 45px);
  line-height: 1.2;
`;

const EBoldText = styled(BoldText)`
  text-align: start;
`;

const Thumbnail = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  border: 1px solid ${(props) => props.theme.opacityBlue};
  margin-left: 10px;
`;

const Timestamp = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin-top: 3px;
  color: ${(props) => props.theme.blue};
  opacity: 0.7;
`;

const NotifyPresenter = ({ data, loading, toggleButton, handleClick }) => {
  // console.log("noti", data);
  return (
    <>
      {loading ? (
        <>
          {toggleButton === false ? (
            <Container>
              <Paw />
            </Container>
          ) : (
            <Container>
              <Paw />
              <NotifiWrapper>
                <LoaderContainer>
                  <Loader />
                </LoaderContainer>
              </NotifiWrapper>
            </Container>
          )}
        </>
      ) : (
        <>
          {!loading && data && data.seeLike && (
            <Container>
              <Paw />
              {toggleButton === true && (
                <NotifiWrapper>
                  <NotiScroll>
                    {data.seeLike.map(
                      (likeUser) =>
                        likeUser.readCheck === false && (
                          <NotifiContainer key={likeUser.id}>
                            <EAvatar
                              url={likeUser.user.avatar}
                              size="sm"
                              username={likeUser.user.username}
                              like={true}
                            />
                            <NotifiInfo
                              onClick={() =>
                                handleClick(likeUser.id, likeUser.post.id)
                              }
                            >
                              <Text>
                                <EBoldText text={`${likeUser.user.username}`} />
                                님이 좋아요를 눌렀습니다.
                                <Timestamp>
                                  <Moment fromNow>{likeUser.createdAt}</Moment>
                                </Timestamp>
                              </Text>
                              <Thumbnail bg={`${likeUser.post.files[0].url}`} />
                            </NotifiInfo>
                          </NotifiContainer>
                        )
                    )}
                  </NotiScroll>
                </NotifiWrapper>
              )}
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default NotifyPresenter;
