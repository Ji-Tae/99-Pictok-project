import React, { useState } from "react";

export const Modal = ({ open, onClose, cancelButton, children }) => {
  if (!open) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        {cancelButton && (
          <button className="close" onClick={onClose}>
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export const UploadModal = ({ open, onClose, onUpload }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = () => {
    // 업로드 로직 처리
    // 선택한 파일을 순회하며 각각 업로드를 수행합니다.
    Array.from(selectedFiles).forEach((file) => {
      onUpload({ title, description, file });
    });
  };

  return (
    <Modal open={open} onClose={onClose} cancelButton>
      <h2>업로드</h2>
      <label htmlFor="file">파일 위치</label>
      <input
        type="file"
        id="file"
        onChange={handleFileChange}
        multiple
      />

      <label htmlFor="title">제목</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="description">내용</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpload}>업로드</button>
    </Modal>
  );
};