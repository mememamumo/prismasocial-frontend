import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import BoldText from "../../Components/BoldText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
  height: 50vh;
`;

const Section = styled.div`
  margin-bottom: 36px;
  display: grid;
  grid-gap: 2%;
  grid-template-columns: repeat(5, 18.5%);
  grid-template-rows: 170px;
  grid-auto-rows: 170px;
`;

const PostSection = styled(Section)`
  grid-gap: 0;
  grid-template-columns: repeat(3, 33.333%);
  grid-template-rows: 300px;
  grid-auto-rows: 300px;
`;

const EBoldText = styled(BoldText)`
  margin: 18px 0 0 18px;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <BoldText text="Search for something :-D" />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <EBoldText text="유저를 찾을 수 없습니다." />
          ) : (
            data.searchUser.map((user) => (
              <UserCard
                key={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
                id={user.id}
              />
            ))
          )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <EBoldText text="포스트가 없습니다." />
          ) : (
            data.searchPost.map((post) => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool
};

export default SearchPresenter;
