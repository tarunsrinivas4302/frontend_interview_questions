import React from 'react';

const Comment = ({ commentData, onEdit, onReply, onDelete }) => {
  return (
    <div className='comment'>
      <p><strong>{commentData.author}</strong></p>
      <p className="content">{commentData.content}</p>
      <p className="date">{new Date(commentData.createdAt).toLocaleString()}</p>
      <button onClick={() => onReply(commentData.id)}>Reply</button>
      <button onClick={() => onEdit(commentData.id)}>Edit</button>
      <button onClick={() => onDelete(commentData.id)}>Delete</button>
    </div>
  );
};

export default Comment;
