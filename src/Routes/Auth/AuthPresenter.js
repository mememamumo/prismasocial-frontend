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
  box-shadow: 8px 8px 0 0 #003489;
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

export default ({
  action,
  username,
  firstName,
  lastName,
  email,
  setAction,
  onSubmit
}) => (
  <Wrapper>
    <Form>
      {action === "logIn" ? (
        <>
          <Helmet>
            <title>Log In | Prismasocial</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} {...email} type="email" />
            <Button text={"Log In"} />
          </form>
        </>
      ) : (
        <>
          <Helmet>
            <title>Sign Up | Prismasocial</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"First name"} {...firstName} />
            <Input placeholder={"Last name"} {...lastName} />
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Username"} {...username} />
            <Button text={"Sign Up"} />
          </form>
        </>
      )}
    </Form>
    <StateChange>
      {action === "logIn" ? (
        <>
          <Text>계정이 없으신가요?</Text>
          <Link onClick={() => setAction("sighUp")}>Sign Up</Link>
        </>
      ) : (
        <>
          <Text>계정이 있으신가요?</Text>
          <Link onClick={() => setAction("logIn")}>Log In</Link>
        </>
      )}
    </StateChange>
  </Wrapper>
);
