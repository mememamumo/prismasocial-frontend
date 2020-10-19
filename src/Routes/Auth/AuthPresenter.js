import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  max-width: 400px;
  min-width: 290px;
  width: 70%;
  position: absolute;
  padding: 50px;
  padding-right: 54px;
  top: 100px;
  left: 50%;
  transform: translate(-50%, 0);
  ${(props) => props.theme.box};
  margin-bottom: 100px;
`;

const StateChange = styled.div``;

const Text = styled.span``;

const Link = styled.span`
  cursor: pointer;
  font-weight: 700;
  margin-left: 8px;
`;

const Form = styled.div``;

//Test
const Test = styled.div`
  padding: 20px 14px 16px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.opacityBlue};
  b {
    font-weight: bold;
    margin-right: 3px;
  }
`;

const TestTitle = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;
const TestEmail = styled.p`
  margin-bottom: 4px;
`;

const TestPassword = styled.p``;

const TestNotice = styled.p`
  margin-top: 10px;
  line-height: 1.1;
`;

export default ({
  action,
  username,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  setAction,
  onSubmit,
  secret
}) => (
  <Wrapper>
    <Form>
      {action === "logIn" && (
        <>
          <Helmet>
            <title>Log In | Prismasocial</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input
              placeholder={"Email"}
              value={email.value}
              onChange={email.onChange}
              type="email"
              required
            />
            <Input
              placeholder={"Password"}
              value={password.value}
              onChange={password.onChange}
              type="password"
              required
            />
            <Button text={"Log In"} />
          </form>
          <Test>
            <TestTitle>테스트 계정</TestTitle>
            <TestEmail><b>이메일</b> test@test.com</TestEmail>
            <TestPassword><b>비밀번호</b> 123456</TestPassword>
            <TestNotice>테스트 계정입니다. 가입 없이 로그인 하실 수 있습니다.</TestNotice>
          </Test>
        </>
      )}
      {action === "signUp" && (
        <>
          <Helmet>
            <title>Sign Up | Prismasocial</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input
              placeholder={"Email"}
              value={email.value}
              onChange={email.onChange}
              type="email"
              required
            />
            <Input
              placeholder={"Password"}
              value={password.value}
              onChange={password.onChange}
              type="password"
              required
            />
            <Input
              placeholder={"Confirm your Password"}
              value={confirmPassword.value}
              onChange={confirmPassword.onChange}
              type="password"
              required
            />
            <Input
              placeholder={"First name"}
              value={firstName.value}
              onChange={firstName.onChange}
              type="text"
              required
            />
            <Input
              placeholder={"Last name"}
              value={lastName.value}
              onChange={lastName.onChange}
              type="text"
              required
            />
            <Input
              placeholder={"Username"}
              value={username.value}
              onChange={username.onChange}
              type="text"
              required
            />
            <Button text={"Sign Up"} />
          </form>
        </>
      )}
      {action === "confirm" && (
        <>
          <Helmet>
            <title>Confirm Secret | Prismasocial</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input
              placeholder="비밀키를 입력해주세요."
              value={secret.value}
              onChange={secret.onChange}
              required
            />
            <Button text={"Confirm"} />
          </form>
        </>
      )}
    </Form>
    {action !== "confirm" && (
      <StateChange>
        {action === "logIn" ? (
          <>
            <Text>계정이 없으신가요?</Text>
            <Link onClick={() => setAction("signUp")}>Sign Up</Link>
          </>
        ) : (
          <>
            <Text>계정이 있으신가요?</Text>
            <Link onClick={() => setAction("logIn")}>Log In</Link>
          </>
        )}
      </StateChange>
    )}
  </Wrapper>
);
