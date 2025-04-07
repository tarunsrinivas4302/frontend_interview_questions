import React from "react";

const useComment = (commentTree) => {
  const getRandomAuthors = () => {
    const authors = [
      "Alice",
      "Bob",
      "Charlie",
      "Don",
      "Elfie",
      "Ajay",
      "Tarun",
      "Siva",
      "Vijay",
      "Satish",
      "Sai",
      "Manindar",
      "Rohan",
    ];
    const n = authors.length;
    return authors[Math.floor(Math.random() * Math.round(n - 1))];
  };

  const addComment = (content) => {
    const Node = {
      id: self.crypto.randomUUID(),
      author: getRandomAuthors(),
      content: content,
      createdAt: new Date().toLocaleString(),
      replies: [],
    };
    return [Node , ...commentTree];
  };


  
  return { addComment };
};

export default useComment;
