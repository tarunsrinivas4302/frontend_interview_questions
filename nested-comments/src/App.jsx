import "./App.css";
import commentData from "./data/data.json";
import NestedComments from "./components/nested-comments";
import { useState } from "react";
import useComment from "./hooks/useComment";

function App() {
  const [newComment, setComment] = useState("");
  const [data, setCommentData] = useState(commentData);
  const [sortOrder, setSortOrder] = useState("newest");
  const [replyBox, setReplyBox] = useState({}); // {commentId: replyText}
  const {
    addComment,
    editComment,
    deleteComment,
    voteComment,
    addReply
  } = useComment(data, setCommentData);

  const handleChange = (e) => setComment(e.target.value);

  const handleAddComment = () => {
    if (!newComment) return;
    setCommentData(addComment(newComment));
    setComment("");
  };

  const handleEditComment = (cmtId, content) => {
    const newContent = prompt("Edit your comment:", content);
    if (newContent) editComment(cmtId, newContent);
  };

  const handleDeleteComment = (cmtId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteComment(cmtId);
    }
  };

  const handleVote = (id, type) => voteComment(id, type);

  const handleReplyChange = (id, value) => {
    setReplyBox({ ...replyBox, [id]: value });
  };

  const handleReplySubmit = (id) => {
    if (!replyBox[id]?.trim()) return;
    addReply(id, replyBox[id]);
    setReplyBox({ ...replyBox, [id]: "" });
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
  });

  return (
    <div className="app-container">
      <div className="comment-box">
        <textarea
          value={newComment}
          onChange={handleChange}
          placeholder="Add your comment..."
          className="add-comment-textarea"
        />
        <button onClick={handleAddComment}>Add Comment</button>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="votes">Most Voted</option>
        </select>
      </div>

      <NestedComments
        comments={sortedData}
        onEdit={handleEditComment}
        onDelete={handleDeleteComment}
        onVote={handleVote}
        replyBox={replyBox}
        onReplyChange={handleReplyChange}
        onReplySubmit={handleReplySubmit}
      />
    </div>
  );
}

export default App;
