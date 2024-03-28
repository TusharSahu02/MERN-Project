import { useEffect, useState } from "react";
import HomeThread from "./Components/HomeThread";
import { toast } from "sonner";
import Post from "./Components/Post";
import NoUsers from "./Components/NoUsers";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecoilState } from "recoil";
import postsAtom from "@/atom/postAtom";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [users, setUser] = useState([]);

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
    const getAllUsers = async () => {
      setUser([]);
      try {
        const res = await fetch("/api/users/allusers");
        const data = await res.json();
        if (data.error) {
          toast.error(data.error, {
            duration: 2000,
          });
          return;
        }
        setUser(data);
      } catch (error) {
        toast.error(error.message, {
          duration: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
    getFeedPost();
  }, [setPosts]);

  return (
    <>
      <HomeThread />

      {!loading && posts?.length === 0 && (
        <>
          <div className="mt-10">
            <h1 className=" text-center text-2xl">Welcome to Chipper</h1>
            <h1 className="text-center text-gray-500">
              ( Follow people to start seeing the photos they share )
            </h1>
          </div>
          <div className="grid gap-6 place-items-center grid-cols-2 mt-10 pb-[100px]">
            {users.map((user) => (
              <NoUsers key={user._id} user={user} />
            ))}
          </div>
        </>
      )}

      {loading && (
        <>
          <HomeSkeleton />
          <HomeSkeleton />
          <HomeSkeleton />
        </>
      )}

      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          author={post.author}
          lastReply={post.replies[post.replies.length - 1]}
        />
      ))}
    </>
  );
};

export default Home;

const HomeSkeleton = () => {
  return (
    <>
      <div className="flex my-3 border-b-[1px] h-full pb-7 border-gray-700">
        <div className="flex mb-4 gap-3">
          <div className="flex flex-col items-center">
            <div className="size-[40px] object-cover rounded-full cursor-pointer">
              <Skeleton className="size-full rounded-full" />
            </div>
          </div>
        </div>
        <div className="w-full ml-3">
          <div className="flex justify-between items-center my-2">
            <Skeleton className="h-2 w-[30%]" />
            <Skeleton className="h-2 w-[5%]" />
          </div>
          <Skeleton className="h-2 w-[70%] my-2" />
          <Skeleton className="h-2 w-[50%] my-2" />
          <Skeleton className="h-2 w-[60%] my-2" />
          <div className="w-full overflow-hidden">
            <Skeleton className="h-[300px] w-full" />
          </div>
          <div className="flex my-3 gap-3">
            <Skeleton className="size-[30px] rounded-full " />
            <Skeleton className="size-[30px] rounded-full " />
            <Skeleton className="size-[30px] rounded-full " />
            <Skeleton className="size-[30px] rounded-full " />
          </div>
          <div className="flex items-center gap-3 w-[35%]  ">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-full" />
          </div>
        </div>
      </div>
    </>
  );
};
