import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  // CONFIRM_SECRET,
  LOCAL_LOG_IN
} from "./AuthQueries.js";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");
  const secret = useInput("");

  const [logInMutation] = useMutation(LOG_IN, {
    variables: { email: email.value, password: password.value }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      password: password.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  // const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
  //   variables: { email: email.value, secret: secret.value }
  // });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "" && password.value !== "") {
        try {
          const {
            data: { logIn: token }
          } = await logInMutation();
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
            window.location.reload(false);
          } else {
            throw Error();
          }
        } catch (error) {
          toast.error(
            "🤦‍♀️ 잘못된 이메일/비밀번호 입니다. 다시 확인하시기 바립니다."
          );
        }
      } else {
        toast.error("📧 이메일을 입력하세요.");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        password.value !== "" &&
        confirmPassword.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        if (password.value && !(password.value.length >= 6)) {
          toast.error("비밀번호는 6자리 이상이어야 합니다.");
          return false;
        } else if (password.value && confirmPassword.value !== password.value) {
          toast.error("🔑 비밀번호가 일치하지 않습니다. 다시 시도해 주세요.");
          return false;
        }
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("😂계정을 생성할 수 없습니다.");
          } else {
            toast.success("🥳 계정이 생성되었습니다. 지금 로그인 하세요.");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("✏️ 모든 영역을 입력하세요.");
      }
    }
    // else if (action === "confirm") {
    //   if (secret.value !== "") {
    //     try {
    //       const {
    //         data: { confirmSecret: token }
    //       } = await confirmSecretMutation();
    //       if (token !== "" && token !== undefined) {
    //         localLogInMutation({ variables: { token } });
    //       } else {
    //         throw Error();
    //       }
    //     } catch {
    //       toast.error(
    //         "🤦‍♀️ 비밀키를 확인할 수 없습니다. 다시 확인하시기 바랍니다."
    //       );
    //     }
    //   }
    // }
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
      confirmPassword={confirmPassword}
      onSubmit={onSubmit}
      secret={secret}
    />
  );
};
