import React, { useState } from "react";
import styled from "styled-components";

export const Modal = ({ open, onClose, cancelButton, children }) => {
  if (!open) return null;
  return (
    <ModalContainer>
      <div className="modal-content">
        {cancelButton && (
          <CloseButton className="close" onClick={onClose}>
            ×
          </CloseButton>
        )}
        {children}
      </div>
    </ModalContainer>
  );
};

export const UploadModal = ({ open, onClose, onUpload }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = () => {
    if (!title || !description || !selectedFiles) {
      setErrorMessage("제목, 내용, 파일을 모두 입력해주세요.");
      return;
    }
    // 업로드 로직 처리
    // 선택한 파일을 순회하며 각각 업로드를 수행합니다.
    Array.from(selectedFiles).forEach((file) => {
      onUpload({ title, description, file });
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} cancelButton>
      <ModalTitle>업로드</ModalTitle>
      <InputLabel htmlFor="file">파일 위치</InputLabel>
      <ModalInput type="file" id="file" onChange={handleFileChange} multiple />
      <InputLabel htmlFor="title">제목</InputLabel>
      <ModalInput
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <InputLabel htmlFor="description">내용</InputLabel>
      <ModalInput
        as="textarea"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <UploadButton onClick={handleSubmit}>업로드</UploadButton>
    </Modal>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 600px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  cursor: auto;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  display: block;
  text-align: left;
  width: 100%;
  margin-bottom: 5px;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const UploadButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 3px;
  margin-bottom: 10px;
  &:hover {
    background-color: #2980b9;
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #3498db;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
color: red; 
font-size: 14px; 
margin-bottom: 10px;
`;