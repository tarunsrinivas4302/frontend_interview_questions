import React from "react";

const Comment = ({ commentData, onEdit, onDelete, onVote , onReplyChange , onReplySubmit , replyBox }) => {
  return (
    <div className="comment">
      <p><strong>{commentData.author}</strong></p>
      <p className="content">{commentData.content}</p>
      <p className="date">{new Date(commentData.createdAt).toLocaleString()}</p>
      <div className="actions">
        <button onClick={() => onVote(commentData.id, "up")}>👍 {commentData.upvotes}</button>
        <button onClick={() => onVote(commentData.id, "down")}>👎 {commentData.downvotes}</button>
        <button onClick={() => onEdit(commentData.id, commentData.content)}>✏️ Edit</button>
        <button onClick={() => onDelete(commentData.id)}>🗑️ Delete</button>
        <button onClick={() => onReplyChange(commentData.id, "")}>💬 Reply</button>
      </div>

      {replyBox[commentData.id] !== undefined && (
        <div className="reply-box">
          <textarea
            value={replyBox[commentData.id]}
            onChange={(e) => onReplyChange(commentData.id, e.target.value)}
            placeholder="Write a reply..."
          />
          <button onClick={() => onReplySubmit(commentData.id)}>Reply</button>
        </div>
      )}

    </div>
  );
};

export default Comment;
