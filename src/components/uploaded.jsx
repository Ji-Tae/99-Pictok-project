import React from 'react';

const UploadedItemsList = ({ uploadedItems, onDelete, onEdit }) => {
  return (
    <div>
      {uploadedItems.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <button onClick={() => onDelete(item.id)}>삭제</button>
          <button onClick={() => onEdit(item.id, { ...item, title: '새로운 제목' })}>수정</button>
        </div>
      ))}
    </div>
  );
};

export default UploadedItemsList;