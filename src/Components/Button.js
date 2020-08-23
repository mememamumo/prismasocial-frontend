import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  box-sizing: border-box;
  outline: none;
  color: ${(props) => props.theme.blue};
  font-weight: 700;
  font-size: 1.1em;
  ${(props) => props.theme.box};
  padding: 10px 30px 13px 30px;
  margin-bottom: 30px;
  transition: transform 0.2s, box-shadow 0.2s;
  transform: translate(-4px, -4px);
  box-shadow: 4px 4px 0px 0px #003489;
  text-align: center;
  cursor: pointer;
  &:hover {
    transform: translate(-6px, -6px);
    box-shadow: 6px 6px 0px 0px #003489;
  }
  &:active {
    transition-delay: -0.15s;
    transform: translate(-2px, -2px);
    box-shadow: 2px 2px 0px 0px #003489;
  }
`;

const Button = ({ text, onClick, className }) => (
  <Container onClick={onClick} className={className}>
    {text}
  </Container>
);

Button.propTypes = {
  text: PropTypes.string.isRequired
};

export default Button;
