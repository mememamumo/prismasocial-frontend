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
  padding: 15px;
`;

const PostSection = styled(Section)`
  padding: 0 15px 15px;
  // @media ${(props) => props.theme.mobile} {
  //   padding: 0;
  // }
`;

const EBoldText = styled(BoldText)`
  margin: 18px 0 0 18px;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  console.log(loading, data);
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
            <UserCard userArray={data.searchUser} />
          )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <EBoldText text="포스트가 없습니다." />
          ) : (
            <SquarePost postArray={data.searchPost} />
          )}
        </PostSection>
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
  data: PropTypes.object
};

export default SearchPresenter;
