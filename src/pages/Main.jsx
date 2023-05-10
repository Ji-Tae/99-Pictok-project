import React from 'react';
import { Layout } from '../style/Layout';
import styled from 'styled-components';
import NewPicArea from '../components/NewPicArea';
import { useAppLogic } from '../components/hooks/useAppLogic';
import { UploadModal } from '../modals/upload.jsx';
import BestPicArea from '../components/BestPicArea';
import Cookies from 'js-cookie';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const Main = () => {
  const { handleUploadClick, uploadModalOpen, setUploadModalOpen, handleUpload } = useAppLogic();
  const cookie = Cookies.get('token');

  const images = [
    'https://r1.community.samsung.com/t5/image/serverpage/image-id/1558989iD806B27D72FD5AC9/image-dimensions/2000?v=v2&px=-1',
    'https://marketplace.canva.com/EAD2xI0GoM0/1/0/1600w/canva-%ED%95%98%EB%8A%98-%EC%95%BC%EC%99%B8-%EC%9E%90%EC%97%B0-%EC%98%81%EA%B0%90-%EC%9D%B8%EC%9A%A9%EB%AC%B8-%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%86%B1-%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4-rssvAb9JL4I.jpg',
  ]

  return (
    <Layout>
      <MainPic>
        <Carousel autoPlay infiniteLoop interval={6000}>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <StyledImg src={imageUrl} alt={`Slide ${index}`} />
            </div>
          ))}
        </Carousel>
        {/* <img
          src='https://marketplace.canva.com/EAD2xI0GoM0/1/0/1600w/canva-%ED%95%98%EB%8A%98-%EC%95%BC%EC%99%B8-%EC%9E%90%EC%97%B0-%EC%98%81%EA%B0%90-%EC%9D%B8%EC%9A%A9%EB%AC%B8-%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%86%B1-%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4-rssvAb9JL4I.jpg'
          alt='메인이미지'
        /> */}
      </MainPic>

      <SharButtonContainer>
        {cookie ? (
          <ShareButton
            onClick={() => {
              handleUploadClick();
            }}>
            사진 공유하기
          </ShareButton>
        ) : (
          <ShareButton
            onClick={() => {
              alert('로그인해주세요');
            }}>
            사진 공유하기
          </ShareButton>
        )}
      </SharButtonContainer>

      <NewPicArea />

      <UploadModal open={uploadModalOpen} onClose={() => setUploadModalOpen(false)} onUpload={handleUpload} />

      <BestPicArea />
    </Layout>
  );
};

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const MainPic = styled.div`
  width: 100%;
  height: 600px;
  background-color: aliceblue;
  img {
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    object-fit: contain;
  }
`;
const SharButtonContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ShareButton = styled.button`
  border: none;
  font-size: 25px;
  border-radius: 15px;
  width: 230px;
  height: 60px;
  background-color: #2563c1;
  color: #fff;
  cursor: pointer;
  &:hover {
    filter: brightness(110%);
  }
  &:active {
    filter: brightness(90%);
  }
`;

export default Main;
