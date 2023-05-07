import React from 'react';

const UploadedItemsList = ({ uploadedItems, onDelete, onEdit }) => {
  return (
    <div>
      {uploadedItems.map((item, index) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <button onClick={() => onDelete(index)}>삭제</button>
          <button onClick={() => onEdit(index, { ...item, title: '새로운 제목' })}>수정</button>
        </div>
      ))}
    </div>
  );
};

export default UploadedItemsList;