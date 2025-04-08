
const useComment = (commentTree, setCommentTree) => {
  const getRandomAuthor = () => {
    const authors = ["Alice", "Bob", "Charlie", "Don", "Elfie"];
    return authors[Math.floor(Math.random() * authors.length)];
  };

  const addComment = (content, parentId = null) => {
    const newComment = {
      id: self.crypto.randomUUID(),
      author: getRandomAuthor(),
      content,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      replies: [],
    };

    if (!parentId) return [newComment, ...commentTree];

    const addReplyRecursively = (tree) =>
      tree.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [newComment, ...comment.replies],
          };
        }
        return {
          ...comment,
          replies: addReplyRecursively(comment.replies),
        };
      });

    setCommentTree((prev) => addReplyRecursively(prev));
  };

  const findComment = (id, tree = commentTree) => {
    for (let cmt of tree) {
      if (cmt.id === id) return cmt;
      if (cmt.replies.length) {
        const found = findComment(id, cmt.replies);
        if (found) return found;
      }
    }
    return null;
  };

  const editComment = (id, newContent) => {
    const editRecursively = (tree) =>
      tree.map((comment) => {
        if (comment.id === id) return { ...comment, content: newContent };
        return { ...comment, replies: editRecursively(comment.replies) };
      });

    setCommentTree((prev) => editRecursively(prev));
  };

  const deleteComment = (id) => {
    const deleteRecursively = (tree) =>
      tree
        .map((comment) => ({
          ...comment,
          replies: deleteRecursively(comment.replies),
        }))
        .filter((comment) => comment.id !== id);

    setCommentTree((prev) => deleteRecursively(prev));
  };

  const addReply = (parentId, content) => {
    const newReply = {
      id: self.crypto.randomUUID(),
      author: getRandomAuthor(),
      content,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      replies: [],
    };

    const addReplyRecursively = (tree) =>
      tree.map((comment) => {
        if (comment.id === parentId) {
          return { ...comment, replies: [newReply, ...comment.replies] };
        }
        return {
          ...comment,
          replies: addReplyRecursively(comment.replies),
        };
      });

    setCommentTree((prev) => addReplyRecursively(prev));
  };
  const voteComment = (id, type) => {
    const voteRecursively = (tree) =>
      tree.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            upvotes: type === "up" ? (comment.upvotes || 0) + 1 : (comment.upvotes || 0),
            downvotes: type === "down" ? (comment.downvotes || 0) + 1 : (comment.downvotes || 0),
          };
        }
        return { ...comment, replies: voteRecursively(comment.replies) };
      });

    setCommentTree((prev) => voteRecursively(prev));
  };

  return { addComment, findComment, editComment, deleteComment, voteComment , addReply };
};

export default useComment;
