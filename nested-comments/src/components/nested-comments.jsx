import React from "react";
import Comment from "./comment";

const NestedComments = ({ comments = [], onEdit, onDelete, onVote  , replyBox , onReplyChange , onReplySubmit }) => {
  return (
    <>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="nested-comment"
        >
          <Comment
            commentData={comment}
            onEdit={onEdit}
            onDelete={onDelete}
            onVote={onVote}
            replyBox={replyBox}
            onReplyChange={onReplyChange}
            onReplySubmit={onReplySubmit}
          />
          {comment.replies.length > 0 && (
            <div className="nested-replies">
              <NestedComments
                comments={comment.replies}
                onEdit={onEdit}
                onDelete={onDelete}
                onVote={onVote}
                replyBox={replyBox}
                onReplyChange={onReplyChange}
                onReplySubmit={onReplySubmit}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default NestedComments;
