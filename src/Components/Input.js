import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.input`
  background: transparent;
  color: ${(props) => props.theme.blue};
  font-size: 1.1em;
  font-weight: 700;
  border: 2px solid #003489;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  margin-bottom: 30px;
  width: 100%;
  height: 2.5em;
  &::placeholder {
    color: ${(props) => props.theme.blue};
    font-weight: 700;
  }
`;

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = "text"
}) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
};

export default Input;
