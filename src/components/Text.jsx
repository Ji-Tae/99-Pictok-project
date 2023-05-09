import React from 'react';
import styled from 'styled-components';

function Text({ children, fontSize, fontWeight, color, margin }) {
  return (
    <TextContainer margin={margin} fontSize={fontSize} fontWeight={fontWeight} color={color}>
      {children}
    </TextContainer>
  );
}
const TextContainer = styled.div`
  margin: ${({ margin }) => `${margin}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  font-weight: ${({ fontWeight }) => `${fontWeight}`};
  color: ${({ color }) => `${color}`};
`;
export default Text;
