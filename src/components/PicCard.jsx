import React from 'react';
import styled from 'styled-components';

function PicCard({ width, card }) {
  return (
    <Card width={width}>
      <ImageBox>
        <img src={card.img} alt='사진 자리' />
      </ImageBox>
      <TextGrop>
        <div>{card.title}</div>
        <div>{card.body}</div>
      </TextGrop>
    </Card>
  );
}
const Card = styled.div`
  border: 1px solid gray;
  border-radius: 12px;
  background-color: white;
  width: ${({ width }) => `${width}%`};
  height: 400px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const ImageBox = styled.div`
  border: 1px solid gray;
  border: none;
  border-radius: 12px;
  width: 90%;
  height: 300px;
  img {
    border-radius: 12px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const TextGrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
export default PicCard;
