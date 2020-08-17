import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries.js";

export default () => {
  const [action, setAction] = useState("login");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const password = useInput("");
  const requestSecret = useMutation(LOG_IN, {
    variables: { email: email.value, password: password.value }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email !== "") {
      requestSecret();
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      password={password}
      onSubmit={onSubmit}
    />
  );
};
