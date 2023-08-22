import Post from "../Post";
import { useEffect, useState, useMemo } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  // Use useMemo to cache the rendered posts array
  const renderedPosts = useMemo(() => {
    return posts.map(post => (
      <Post key={post.id} {...post} />
    ));
  }, [posts]);

  return (
    <>
      {renderedPosts}
    </>
  );
}
