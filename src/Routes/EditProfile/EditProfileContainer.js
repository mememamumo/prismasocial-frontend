import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import axios from "axios";
import EditProfilePresenter from "./EditProfilePresenter";
import { GET_USER, EDIT_PROFILE } from "./EditProfileQueries";
import { TIMELINE_QUERY } from "../../SharedQueries";

export default ({
  match: {
    params: { editUser }
  },
  history
}) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  //avatar
  const [fileLoading, setFileLoading] = useState(false);
  const awsFile = useState([])[0];
  const blobFile = useState([])[0];
  const [isFile, setIsFile] = useState({});

  const { data, loading } = useQuery(GET_USER, {
    variables: { username: editUser }
  });

  const [editUserMutation] = useMutation(EDIT_PROFILE, {
    variables: { username, firstName, lastName, bio }
  });

  const [editAvatarMutation] = useMutation(EDIT_PROFILE, {
    refetchQueries: () => [{
      query: TIMELINE_QUERY,
      variables: { username }
    }]
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
          history.push("/")
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("유저이름, 이메일 영역을 입력해주세요.");
    }
  };

  //avatar
  const handleAvatar = async (e) => {
    const file = e.target.files;
    setIsFile(file);
    let obj = window.URL.createObjectURL(file[0]);
    blobFile.shift();
    blobFile.push(obj);
    awsFile.shift();
    awsFile.push(file[0]);
    console.log("awsFirst", awsFile);
  };

  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8800"
      : "https://prismasocial-backend.herokuapp.com";

  const handleChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (var result of awsFile) {
      formData.append("file", result);
      console.log("result", result);
    }

    try {
      setFileLoading(true);
      const { 
        data: { location }
      } = await axios
        .post(`${url}/api/upload`, formData, {
          headers: {
            "content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
          }
      });
      
      const {
        data: { editUser }
      } = await editAvatarMutation({
        variables: {
          username,
          avatar: location.toString()
        }
      });

      if (editUser) {
        toast.success("프로필 사진이 등록되었습니다.");
        window.location.reload() 
      }
    } catch (err) {
      toast.error("업로드를 실패하였습니다.")
      console.log(err);
    } finally {
      setFileLoading(false);
    }
  }

  useEffect(() => {
    return () => window.URL.revokeObjectURL(blobFile);
  }, [blobFile]);

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
      handleChange={handleChange}
      handleAvatar={handleAvatar}
      isFile={isFile}
      blobFile={blobFile}
      fileLoading={fileLoading}
    />
  );
};
