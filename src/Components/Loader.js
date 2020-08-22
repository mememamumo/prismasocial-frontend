import React from "react";
import styled, { keyframes } from "styled-components";
import { Logo } from "./Icons";

const Spinner = keyframes`
	from {
		transform:rotate(0deg);
	}
	to {
		transform:rotate(360deg);
	}
`;

const Loader = styled.div`
  width: 36px;
  height: 36px;
  animation: ${Spinner} 0.5s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  svg {
    fill: ${(props) => props.theme.pink};
  }
`;

export default () => (
  <Loader>
    <Logo size={36} />
  </Loader>
);
