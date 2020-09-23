import React, { useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Logo, Explore } from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";
import Avatar from "./Avatar";
// import PopUp from "./PopUp";
import NotifyLike from "./NotifyLike";

const Header = styled.header`
  width: 100%;
  position: fixed;
  top: 40px;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.theme.box};
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-rigth: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    margin-right: 30px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
  }
`;

const SearchInput = styled(Input)`
  margin: 10px 0 20px;
`;

const LogoLink = styled(Link)`
  margin-left: 30px;
`;

const HeaderLink = styled(Link)`
  margin-right: 30px;
`;

const HeaderNote = styled.div`
  margin-right: 30px;
  cursor: pointer;
  align-self: center;
`;

const EAvatar = styled(Avatar)``;

export default withRouter(({ history }) => {
  const search = useInput("");
  const { data, loading } = useQuery(ME);
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };
  // console.log(data);

  const [toggleButton, setToggleButton] = useState(false);
  const handleButton = () => {
    setToggleButton(!toggleButton);
  };

  // console.log("data", data);

  return (
    !loading && (
      <>
        <Header>
          <HeaderWrapper>
            <HeaderColumn>
              <LogoLink to="/">
                <Logo size={30} />
              </LogoLink>
            </HeaderColumn>
            <HeaderColumn>
              <form onSubmit={onSearchSubmit}>
                <SearchInput
                  value={search.value}
                  onChange={search.onChange}
                  placeholder="Search"
                  required={false}
                />
              </form>
            </HeaderColumn>
            <HeaderColumn>
              <HeaderLink to="/explore">
                <Explore size={29} />
              </HeaderLink>
              <HeaderNote onClick={handleButton}>
                {/* <Paw size={28} /> */}
                <NotifyLike toggleButton={toggleButton} />
              </HeaderNote>
              {data.me !== undefined && (
                <EAvatar
                  url={data.me.avatar}
                  size="sm"
                  link={true}
                  username={data.me.username}
                />
              )}
            </HeaderColumn>
          </HeaderWrapper>
        </Header>
        {/* {isOpenNoti && data.me && (
          <PopUp
            title={"알림"}
            togglePopFn={toggleNote}
            kind={"NOTIFICATION"}
            data={data.me.username}
          />
        )} */}
      </>
    )
  );
});
