import React, { useEffect, useState } from "react";

const PageProgress = ({ children }: { children: React.ReactNode }) => {
  const [Ypos, setYPos] = useState(window.scrollY);

  useEffect(() => {
  window.addEventListener("scroll", () => {
    setYPos(window.scrollY);
  });
  return () => window.removeEventListener("scroll", () => {});
} , [])

  const progress =
    (Ypos / (document.body.scrollHeight - window.innerHeight)) * 100;
    console.log(progress);
  return (
    <div className="progress">
      <div
        className="progress-bar"
        style={{
            width : `${progress}%`
        }}
    ></div>
      {children}
    </div>
  );
};

export default PageProgress;
