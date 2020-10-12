import React from "react";
import styled from "styled-components";
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
  @media ${(props) => props.theme.mobile} {
    padding: 0;
  }
`;

const Header = styled.header`
  ${(props) => props.theme.toneBox};
  padding: 40px 30px;
  position: relative;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    border-radius: 0;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const Wrap = styled.div``;

const EAvatar = styled(Avatar)`
  margin: 0 auto 20px;
`;

const EButton = styled(Button)`
  padding: 6px 10px;
  width: 100%;
`;

const FormWrap = styled.div`
  display: flex;
  @media ${(props) => props.theme.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Form = styled.form`
  margin-left: 30px;
  padding: 40px 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media ${(props) => props.theme.mobile} {
    margin-left: 0;
  }
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

const AvatarUploadInput = styled.input``;

const ButtonContainer = styled.div`
  margin-top: 20px;
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
  handleChange,
  handleAvatar,
  isFile,
  blobFile,
  fileLoading
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
        <FormWrap>
          <Header>
            <AvatarContainer>
              {fileLoading && <Loader />}
              {isFile[0] ? (
                <Wrap>
                  {blobFile.map((url, index) => <EAvatar
                    size="lg"
                    url={url}
                    username={seeUser.username}
                    link={false}
                    key={index}
                  />)}
                </Wrap>
              ) : (
                <EAvatar
                  size="lg"
                  url={seeUser.avatar}
                  username={seeUser.username}
                  link={false}
                />
              )}
              <AvatarUploadInput type="file" id="avatarElem" accept="image/*" onChange={handleAvatar} />
            </AvatarContainer>
            <ButtonContainer onClick={handleChange}>
              <EButton text={"프로필 사진 등록"} />
            </ButtonContainer>
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
      </Wrapper>
    );
  }
};
