// 3rd Party Modules
import { useEffect, useRef, useState, type SetStateAction } from "react";
import { type UseQueryResult } from "@tanstack/react-query";

// Local Modules
import styles from "./Feed.module.css";
import { useGetFeed, useGetFeedPagination } from "../../api/endpoints";
import { DialogBox } from "../../components/DialogBox/DialogBox";
import { Post } from "../../components/Post/Post";
import { type GetFeed200DataItem } from "../../api/models";
import { Button } from "../../components/Button/Button";

// helpers
const setObserver = (
  loadMoreButtonElement: Element | null,
  paginationFeed: UseQueryResult,
) => {
  let observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        paginationFeed.refetch();
      }
    },
    { threshold: 0.5 },
  );

  if (loadMoreButtonElement) {
    observer.observe(loadMoreButtonElement);
  }
  return () => {
    if (loadMoreButtonElement) {
      observer.unobserve(loadMoreButtonElement);
    }
  };
};
const loadMorePosts = (
  feedData: GetFeed200DataItem[],
  posts: GetFeed200DataItem[],
  setPosts: (value: SetStateAction<GetFeed200DataItem[]>) => void,
) => {
  const responseData: GetFeed200DataItem[] = feedData || [];
  if (posts.at(-1)?.id !== responseData.at(-1)?.id) {
    setPosts((prev) => [...prev, ...responseData]);
  }
};

// Exportable Component
export const Feed = () => {
  const buttonRef = useRef(null);
  const [posts, setPosts] = useState<GetFeed200DataItem[]>([]);
  const [morePostsAvailable, setMorePostsAvailable] = useState<boolean>(true);
  const initialFeed = useGetFeed({ fetch: { credentials: "include" } });
  const paginationFeed = useGetFeedPagination(posts.at(-1)?.id || "", {
    fetch: { credentials: "include" },
    query: { enabled: false },
  });

  useEffect(() => setObserver(buttonRef.current, paginationFeed), []);
  useEffect(
    () => loadMorePosts(initialFeed.data?.data.data, posts, setPosts),
    [initialFeed.data],
  );
  useEffect(() => {
    loadMorePosts(paginationFeed.data?.data.data, posts, setPosts);
    if (paginationFeed.data?.data.data.length < 10) {
      setMorePostsAvailable(false);
    }
  }, [paginationFeed.data]);

  return (
    <DialogBox title="Your timeline">
      <div className={styles.feed}>
        {posts.length &&
          posts.map((post) => (
            <Post
              key={post.id}
              username={post.author.username}
              content={post.content}
              publishedAt={post.publishedAt}
              updatedAt={post.updatedAt}
            />
          ))}
        {morePostsAvailable && (
          <span className={styles.loadMoreContainer} ref={buttonRef}>
            <Button name="Load more posts" onClick={() => {}} />
          </span>
        )}
      </div>
    </DialogBox>
  );
};
