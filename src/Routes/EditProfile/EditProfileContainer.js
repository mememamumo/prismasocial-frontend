import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import EditProfilePresenter from "./EditProfilePresenter";
import { GET_USER, EDIT_PROFILE } from "./EditProfileQueries";

export default ({
  match: {
    params: { editUser }
  }
}) => {
  const [action, setAction] = useState("view");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  const { data, loading } = useQuery(GET_USER, {
    variables: { username: editUser }
  });

  const [editUserMutation] = useMutation(EDIT_PROFILE, {
    variables: { username, firstName, lastName, bio }
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (username !== "") {
      try {
        const {
          data: { editUser }
        } = await editUserMutation();
        if (!editUser) {
          toast.error("정보를 수정할 수 없습니다.");
        } else {
          toast.success("정보 수정 완료");
          setTimeout(() => setAction("profile"), 1000);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("유저이름, 이메일 영역을 입력해주세요.");
    }
  };

  return (
    <EditProfilePresenter
      data={data}
      loading={loading}
      username={username}
      setUsername={setUsername}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setBio={setBio}
      onSubmit={onSubmit}
      action={action}
    />
  );
};
