import React from 'react';
import styled from 'styled-components';
import Text from './Text';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import { differenceInHours, differenceInMinutes } from 'date-fns';

function PicCard({ width, card }) {
  const postAtDate = new Date(card.createdAt);
  const currentDateTime = new Date();
  const minutesAgo = differenceInMinutes(currentDateTime, postAtDate);
  const hoursAgo = differenceInHours(currentDateTime, postAtDate);
  console.log(hoursAgo);
  return (
    <Card width={width}>
      <ImageBox>
        <img src={card.photo_ip} alt='사진 자리' />
      </ImageBox>
      <CardBody>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <span>
              <HeartOutlined />
              15
            </span>
            <span>
              <CommentOutlined />
              17
            </span>
          </div>

          <Text fontSize={10} color={'#9d9d9d'}>
            {hoursAgo < 1 ? `${minutesAgo} 분 전` : `${hoursAgo} 시간 전`}
          </Text>
        </div>
        <TextGrop>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text fontSize={20} margin={5} fontWeight={700}>
              {card.title}
            </Text>
            <Text fontSize={14} margin={5}>
              {card.content}
            </Text>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '30px',
            }}>
            <Text fontSize={12} color={'#9d9d9d'}>
              {card.nickname}님이 업로드하신 사진입니다
            </Text>
            <Text fontSize={10} color={'#9d9d9d'}>
              댓글 달기
            </Text>
          </div>
        </TextGrop>
      </CardBody>
    </Card>
  );
}
const Card = styled.div`
  border: 1px solid rgba(217, 217, 217, 1);
  border-radius: 12px;
  background-color: white;
  width: ${({ width }) => `${width}px`};
  height: 540px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.102);
`;
const ImageBox = styled.div`
  border: 1px solid gray;
  border: none;
  border-radius: 12px;
  width: 100%;
  height: 70%;
  position: relative;
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
  justify-content: center;
  gap: 10px;
`;
const CardBody = styled.div`
  padding: 15px;
`;
export default PicCard;
