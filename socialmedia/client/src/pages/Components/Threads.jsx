import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import Post from "./Post";

const Threads = ({ username, currentUser }) => {
  const [loading, setLoading] = useState(true);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    // window.scrollTo(0, 0);
    const getThreads = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();

        setThreads(data);
      } catch (error) {
        toast.error(error.message, {
          duration: 2000,
        });
        setThreads([]);
      } finally {
        setLoading(false);
      }
    };
    getThreads();
  }, [username]);

  if (!loading && !threads.length) {
    return (
      <>
        <div className="h-[200px] flex items-center justify-center flex-col">
          <h1 className="text-gray-500">No Threads</h1>
          {currentUser?.username === username && (
            <button className="text-gray-500 border-[1px] border-gray-500 px-3 py-1 rounded-full p-2 mt-5">
              Start your first thread
            </button>
          )}
          {/* <button>Start your first thread</button> */}
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
    );
  }

  return (
    <>
      {threads.map((thread) => (
        <>
          <Post key={thread._id} post={thread} author={thread.author} />
        </>
      ))}
    </>
  );
};

export default Threads;

const PostSkeleton = () => {
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
