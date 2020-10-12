import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Logo, Explore, Upload } from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";
import Avatar from "./Avatar";
// import PopUp from "./PopUp";
import NotifyLike from "./NotifyLike";
import { NavLink } from "react-router-dom";

const Header = styled.header`
  width: 100%;
  position: fixed;
  top: 40px;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 2;
  @media ${(props) => props.theme.mobile} {
    top: 14px;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.theme.box};
  @media ${(props) => props.theme.mobile} {
    margin: 0 14px;
  }
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
    @media ${(props) => props.theme.mobile} {
      margin-right: 20px;
    }
  }
`;

const EHeaderColumn = styled(HeaderColumn)`
  @media ${(props) => props.theme.mobile} {
    width: 20%;
  }
`;

const SearchInput = styled(Input)`
  margin: 10px 0 20px;
`;

const LogoLink = styled(NavLink)`
  margin-left: 30px;
  &.active {
    svg {
      fill: ${(props) => props.theme.bgPinkColor};
      path {
        fill: ${(props) => props.theme.bgPinkColor};
      }
    }
  }
  @media ${(props) => props.theme.mobile} {
    margin-left: 20px;
  }
`;

const HeaderLink = styled(NavLink)`
  display: flex;
  align-items: center;
  margin-right: 30px;
  svg {
    fill: ${(props) => props.theme.blue};
  }
  &.active {
    svg {
      fill: ${(props) => props.theme.bgPinkColor};
      path {
        fill: ${(props) => props.theme.bgPinkColor};
      }
    }
  }
  @media ${(props) => props.theme.mobile} {
    margin-right: 10px;
  }
`;

const HeaderNote = styled.div`
  margin-right: 30px;
  cursor: pointer;
  align-self: center;
  @media ${(props) => props.theme.mobile} {
    margin-right: 10px;
  }
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
            <EHeaderColumn>
              <LogoLink exact activeClassName="active" to="/">
                <Logo size={30} />
              </LogoLink>
            </EHeaderColumn>
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
              <HeaderLink exact activeClassName="active" to="/explore">
                <Explore size={29} />
              </HeaderLink>
              <HeaderNote onClick={handleButton}>
                {/* <Paw size={28} /> */}
                <NotifyLike toggleButton={toggleButton} />
              </HeaderNote>
              <HeaderLink exact activeClassName="active" to="/upload">
                <Upload size={26} />
              </HeaderLink>
              {data.me !== undefined && (
                <EAvatar
                  url={data.me.avatar}
                  size="sm"
                  link={true}
                  username={data.me.username}
                  activeClassName="active"
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
