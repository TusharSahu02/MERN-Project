import { useEffect, useState } from "react";
import HomeThread from "./Components/HomeThread";
import { toast } from "sonner";
import Post from "./Components/Post";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getFeedPost = async () => {
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if (data.error) {
          toast.error(data.error, {
            duration: 2000,
          });
          return;
        }
        setPosts(data);
      } catch (error) {
        toast.error(error.message, {
          duration: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    getFeedPost();
  }, []);

  return (
    <>
      <HomeThread />
      {loading && (
        <>
          <h1>loading...</h1>
        </>
      )}

      {!loading && posts.length === 0 && (
        <>
          <h1>No posts found</h1>
          <h1>Follow some accounts to see posts</h1>
        </>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} author={post.author} />
      ))}
    </>
  );
};

export default Home;
