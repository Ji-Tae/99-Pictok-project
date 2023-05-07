import React from 'react';
import styled from 'styled-components';

function Text({ children }) {
  return <TextContainer>{children}</TextContainer>;
}
const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
`;
export default Text;
