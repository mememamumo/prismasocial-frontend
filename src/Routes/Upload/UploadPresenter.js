import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Slider from "react-animated-slider";
import "./Upload.css";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Loader from "../../Components/Loader";

const Wrapper = styled.div`
  min-height: 80vh;
  height: 468px;
  display: flex;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;

const UploadForm = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  margin: 0 auto;
  @media ${(props) => props.theme.mobile} {
    width: 90%;
    padding-top: 20px;
  }
`;

const UploadImage = styled.div`
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  resize: both;
  margin-bottom: 10px;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const TextInput = styled(Input)`
  margin-bottom: 30px;
`;

const FileSelect = styled.input`
  margin-bottom: 50px !important;
`;

const ButtonContainer = styled.div`
  button {
    width: 100%;
  }
`;

export default ({
  isFile,
  loading,
  blobFile,
  captionInput,
  locationInput,
  handleChange,
  handleSubmit
}) => {
  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>Uload | Prismagram</title>
          </Helmet>
          {isFile[0] && (
            <Slider>
              {blobFile.map((image, index) => (
                <UploadImage url={image} key={index} />
              ))}
            </Slider>
          )}
          <UploadForm>
            <TextInput
              placeholder="글"
              value={captionInput.value}
              onChangeText={captionInput.onChange}
              required
              {...captionInput}
            />
            <TextInput
              placeholder="위치"
              value={locationInput.value}
              onChangeText={locationInput.onChange}
              required
              {...locationInput}
            />
            <FileSelect
              type="file"
              accept="image/*"
              onChange={handleChange}
              multiple
              required
            />
            <ButtonContainer onClick={handleSubmit}>
              <Button text={"게시물 등록"} />
            </ButtonContainer>
          </UploadForm>
        </>
      )}
    </Wrapper>
  );
};
