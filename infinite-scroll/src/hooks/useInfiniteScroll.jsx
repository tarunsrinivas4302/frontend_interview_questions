// hooks/useInfiniteScroll.js

import { useEffect } from "react";

const useInfiniteScroll = ({ loaderRef, loading, renderAll, loadMore }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !renderAll) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [loaderRef, loading, renderAll, loadMore]);
};
 export default useInfiniteScroll