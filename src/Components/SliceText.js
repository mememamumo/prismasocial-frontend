import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Span = styled.span`
  margin-left: 5px;
`;

const More = styled.span`
  color: ${(props) => props.theme.deepGray};
  cursor: pointer;
  margin-left: 5px;
`;

const SliceText = ({ text, length = 20 }) => {
  const [showLess, setShowLess] = useState(true);
  const textLength = text.length;

  if (textLength < length) {
    return <Span>{text}</Span>;
  }

  return (
    <Span>
      {showLess ? `${text.slice(0, length)}...` : text}
      <More onClick={() => setShowLess(!showLess)}>
        {showLess ? "더 보기" : null}
      </More>
    </Span>
  );
};

SliceText.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
};

export default SliceText;
