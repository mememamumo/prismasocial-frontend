import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import axios from "axios";
import { UPLOAD } from "./UploadQueries";
import { TIMELINE_QUERY } from "../../SharedQueries";
import useInput from "../../Hooks/useInput";
import UploadPresenter from "./UploadPresenter";

export default ({ history }) => {
  const [loading, setIsLoading] = useState(false);
  const awsFile = useState([])[0];
  const blobFile = useState([])[0];
  const [isFile, setIsFile] = useState({});
  const captionInput = useInput("test");
  const locationInput = useInput("test");
  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: TIMELINE_QUERY }]
  });

  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8800"
      : "https://prismasocial-backend.herokuapp.com";

  const handleChange = async (e) => {
    if (blobFile.length >= 5) {
      return toast.error("사진은 5장까지만 업로드 가능합니다.");
    }

    const files = e.target.files;
    setIsFile(files);
    for (var value of files) {
      var obj = window.URL.createObjectURL(value);
      blobFile.push(obj);
      awsFile.push(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (captionInput.value === "") {
      return toast.error("글을 작성해주세요.");
    } else if (awsFile.length === 0) {
      return toast.error("파일을 선택해주세요.");
    }

    const formData = new FormData();
    for (var result of awsFile) {
      formData.append("file", result);
    }

    console.log("blob", blobFile);
    console.log("awsFile", awsFile);

    try {
      setIsLoading(true);
      const {
        data: { location }
      } = await axios
        .post(`${url}/api/uploads`, formData, {
          headers: {
            "content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
          }
        })
        // .then((res) => console.log("res.data", res.data.location))
        // .catch((err) => console.log("err", err));

      const {
        data: { upload }
      } = await uploadMutation({
        variables: {
          files: location,
          caption: captionInput.value,
          location: locationInput.value
        }
      });

      if (upload) {
        console.log(upload);
        toast.success("업로드 되었습니다.");
        history.push(`/`);
      }
    } catch (err) {
      toast.error("업로드 할 수 없습니다. 다시 시도해 주세요.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => window.URL.revokeObjectURL(blobFile);
  }, [blobFile]);

  return (
    <UploadPresenter
      isFile={isFile}
      loading={loading}
      blobFile={blobFile}
      captionInput={captionInput}
      locationInput={locationInput}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
