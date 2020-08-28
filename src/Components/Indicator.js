import React from "react";
import styled from "styled-components";
import { IndicatorIcon } from "./Icons";

const Container = styled.div`
  &:not(:last-child) {
    margin-right: 6px;
  }
  svg {
    fill: ${(props) => (props.showing ? "white" : "rgba(255, 255, 255,0.5)")};
  }
`;

const Indicator = ({ countArray, currentItem }) => {
  return countArray.map((count, index) => {
    return <Circle key={index} showing={index === currentItem} />;
  });
};

const Circle = (props) => {
  // console.log(props);
  return (
    <Container showing={props.showing}>
      <IndicatorIcon />
    </Container>
  );
};

export default Indicator;
