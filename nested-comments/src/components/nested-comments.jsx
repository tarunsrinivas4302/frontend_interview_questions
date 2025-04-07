import { memo } from "react";
import Comment from "./comment";

const NestedComments = ({ comments = [], onEdit, onDelete }) => {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} style={{ marginLeft: "10px", borderLeft: "2px solid #ccc", paddingLeft: "10px" }}>
          <Comment
            commentData={comment}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          {comment.replies && Array.isArray(comment.replies) && comment.replies.length > 0 && (
            <NestedComments
              comments={comment.replies}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default memo(NestedComments);
