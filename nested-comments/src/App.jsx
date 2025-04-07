import "./App.css";
import commentData from "./data/data.json";
import NestedComments from "./components/nested-comments";
import { useState } from "react";
import useComment from "./hooks/useComment";

function App() {
  const [newComment, setComment] = useState("");
  const [data, setCommentData] = useState(commentData);

  const { addComment } = useComment(data);

  const handleChange = (e) => {
    const value = e.target.value;
    setComment(value);
  };


  const handleAddComment = () => {
    if (!newComment) return;
    const newComments = addComment(newComment);
    setCommentData(newComments);
    setComment("");
  };

  const handleEditComment = (cmtId) => {
    console.log({cmtId})
  }

  const deleteComment = (cmtId) => {
    console.log({cmtId})
  }
  
  return (
    <>
      <div className="comment-box">
        <textarea
          value={newComment}
          className="add-comment-textarea"
          onChange={handleChange}
          cols={30}
          rows={4}
          placeholder="Add Your Comment"
        ></textarea>
        <button type="button" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
      <NestedComments comments={data} onEdit={handleEditComment} onDelete={deleteComment}/>
    </>
  );
}

export default App;
