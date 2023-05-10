import React from 'react';
import { Layout } from '../style/Layout';
import styled from 'styled-components';
import NewPicArea from '../components/NewPicArea';
import { useAppLogic } from '../components/hooks/useAppLogic';
import { UploadModal } from '../modals/upload.jsx';
import BestPicArea from '../components/BestPicArea';
import Cookies from 'js-cookie';

const Main = () => {
  const { handleUploadClick, uploadModalOpen, setUploadModalOpen, handleUpload } = useAppLogic();
  const cookie = Cookies.get('token');

  return (
    <Layout>
      <MainPic>
        <img
          src='https://marketplace.canva.com/EAD2xI0GoM0/1/0/1600w/canva-%ED%95%98%EB%8A%98-%EC%95%BC%EC%99%B8-%EC%9E%90%EC%97%B0-%EC%98%81%EA%B0%90-%EC%9D%B8%EC%9A%A9%EB%AC%B8-%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%86%B1-%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4-rssvAb9JL4I.jpg'
          alt='메인이미지'
        />
      </MainPic>
      {cookie ? (
        <SharButtonContainer>
          <ShareButton
            onClick={() => {
              handleUploadClick();
            }}>
            사진 공유하기
          </ShareButton>
        </SharButtonContainer>
      ) : null}

      <NewPicArea />

      <UploadModal open={uploadModalOpen} onClose={() => setUploadModalOpen(false)} onUpload={handleUpload} />

      <BestPicArea />
    </Layout>
  );
};

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
