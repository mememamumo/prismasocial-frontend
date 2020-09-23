import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import BoldText from "../../Components/BoldText";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import useInput from "../../Hooks/useInput";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.header`
  ${(props) => props.theme.toneBox};
  padding: 40px 30px;
`;

const EAvatar = styled(Avatar)`
  margin: 0 auto 30px;
`;

const EButton = styled(Button)`
  padding: 6px 10px;
  width: 100%;
`;

const FormWrap = styled.div`
  display: flex;
`;

const Form = styled.form`
  margin-left: 30px;
  padding: 40px 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UserColumn = styled.div``;

const BioText = styled.div`
  margin-top: 10px;
`;

const EBoldText = styled(BoldText)`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  font-size: 16px;
  &:first-child {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const EFButton = styled(Button)`
  margin-top: 30px;
`;

const Text = styled.div`
  margin-bottom: 5px;
`;

// * Don't do it this way. => const EditProfilePresenter
// Use it this => "export default" , to use useInput in conditional.
export default ({
  data,
  loading,
  username,
  setUsername,
  setFirstName,
  setLastName,
  setBio,
  onSubmit,
  action
}) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const { seeUser } = data;
    const username = useInput(`${seeUser.username}`);
    const firstName = useInput(`${seeUser.firstName}`);
    const lastName = useInput(`${seeUser.lastName}`);
    const bio = useInput(`${seeUser.bio}`);
    setUsername(`${username.value}`);
    setFirstName(`${firstName.value}`);
    setLastName(`${lastName.value}`);
    setBio(`${bio.value}`);

    return (
      <Wrapper>
        <Helmet>
          <title>Edit Profile | {`${seeUser.username}`}</title>
        </Helmet>
        {action === "view" && (
          <FormWrap>
            <Header>
              <EAvatar
                size="lg"
                url={seeUser.avatar}
                username={seeUser.username}
                link={false}
              />
              <EButton text={"프로필 사진 바꾸기"} />
              <UserColumn>
                <EBoldText text={username.value} />
                <EBoldText text={`${firstName.value} ${lastName.value}`} />
                <EBoldText text={seeUser.email} />
                <BioText>{bio.value}</BioText>
              </UserColumn>
            </Header>
            <Form onSubmit={onSubmit}>
              <Text>사용자 이름</Text>
              <Input
                placeholder={""}
                value={username.value}
                onChange={username.onChange}
                type="text"
                required={false}
              />
              <Text>성</Text>
              <Input
                placeholder={""}
                value={firstName.value}
                onChange={firstName.onChange}
                type="text"
                required={false}
              />
              <Text>이름</Text>
              <Input
                placeholder={""}
                value={lastName.value}
                onChange={lastName.onChange}
                type="text"
                required={false}
              />
              <Text>소개</Text>
              <Input
                placeholder={""}
                value={bio.value}
                onChange={bio.onChange}
                type="text"
                required={false}
              />
              <EFButton text={"Edit Profile"} />
            </Form>
          </FormWrap>
        )}
        {action === "profile" && <Redirect to="/" />}
      </Wrapper>
    );
  }
};
