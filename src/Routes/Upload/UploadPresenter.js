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
`;

const UploadForm = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const UploadImage = styled.div`
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  resize: both;
  margin-bottom: 10px;
`;

const TextInput = styled(Input)`
  margin-bottom: 10px;
`;

const FileSelect = styled.input`
  margin-bottom: 50px !important;
`;

const ButtonContainer = styled.span``;

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
                <UploadImage
                  url={image}
                  key={index}
                  onLoad={(e) => window.URL.revokeObjectURL(image)}
                />
              ))}
            </Slider>
          )}
          <UploadForm>
            <TextInput
              placeholder="caption"
              value={captionInput.value}
              onChangeText={captionInput.onChange}
              required
              {...captionInput}
            />
            <TextInput
              placeholder="location"
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
