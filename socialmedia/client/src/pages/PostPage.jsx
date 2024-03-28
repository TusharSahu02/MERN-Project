import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "./Components/Comment";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import Reply from "./modals/Reply";
import userAtom from "@/atom/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import postsAtom from "@/atom/postAtom";

const PostPage = () => {
  const loggedUser = useRecoilValue(userAtom);

  const [posts, setPosts] = useRecoilState(postsAtom);
  const [user, setUser] = useState(null);
  const [liking, setLiking] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { pid } = useParams();
  const currentPost = posts[0];
  const [liked, setLiked] = useState(
    currentPost?.likes?.includes(loggedUser?._id)
  );

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          toast.error(data.error, {
            duration: 2000,
          });
          return;
        }

        setPosts([data]);
      } catch (error) {
        toast.error(error, {
          duration: 2000,
        });
      }
    };

    const getUser = async () => {
      if (!currentPost?.author) {
        return;
      }

      try {
        const res = await fetch(`/api/users/profile/${currentPost?.author}`);
        const data = await res.json();

        if (data.error) {
          toast.error(data.error, {
            duration: 2000,
          });
          return;
        }

        setUser(data);
      } catch (error) {
        toast.error(error, {
          duration: 2000,
        });
      }
    };
    getPost();
    getUser();
  }, [pid, currentPost?.author, setPosts]);

  const handleLikeAndUnlike = async () => {
    if (!user) {
      toast.error("Please login first", {
        duration: 2000,
      });
      return;
    }

    if (liking) return;
    setLiking(true);

    try {
      const res = await fetch(`/api/posts/like/${currentPost?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error, {
          duration: 2000,
        });
        return;
      }

      if (!liked) {
        const updatedPost = posts?.map((p) => {
          if (p?._id === currentPost?._id) {
            return {
              ...currentPost,
              likes: [...currentPost?.likes, user?._id],
            };
          }
          return p;
        });
        setPosts(updatedPost);
      } else {
        const updatedPost = posts?.map((p) => {
          if (p?._id === currentPost?._id) {
            return {
              ...currentPost,
              likes: currentPost?.likes.filter((l) => l !== user?._id),
            };
          }
          return p;
        });
        setPosts(updatedPost);
      }
      setLiked(!liked);
    } catch (error) {
      toast.error(error, {
        duration: 2000,
      });
    } finally {
      setLiking(false);
    }
  };

  const handleModal = () => {
    setShowModal(true);
    document.body.classList.add("modal-open");
  };
  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove("modal-open");
  };

  const isProfilePic = user?.profilePic
    ? user?.profilePic
    : "https://preview.redd.it/reddit-avatars-anyone-v0-0yghd1cewi0a1.png?width=587&format=png&auto=webp&s=54c04fa2f1c795ac2d5c112d5ad1a0015f696775";

  const formattedDate =
    currentPost &&
    formatDistanceToNow(new Date(currentPost?.createdAt), { addSuffix: true });

  if (!currentPost) {
    return <PostSkeleton />;
  }

  return (
    <>
      <div>
        <div className=" border-b-[1px] border-gray-800 pb-3">
          <div className="size-[40px] items-center flex justify-center rounded-full hover:bg-gray-800 cursor-pointer">
            <IoArrowBackOutline size={24} />
          </div>
        </div>
        <div className="border-b-[1px] border-gray-800 py-4">
          <div className="flex justify-between items-center">
            <Link to={`/${user?.username}`} className="flex items-center">
              <img
                src={isProfilePic}
                alt=""
                className="size-[40px] object-cover rounded-full"
              />
              <h1 className="ml-3 font-semibold">{user?.username}</h1>
            </Link>
            <div className="flex">
              <p className="text-gray-500 text-sm mr-3">{formattedDate}</p>
              <IoIosMore size={22} />
            </div>
          </div>
          <div className="py-2">
            <p>{currentPost?.text}</p>
            <div className="mt-3">
              <img
                className="w-full rounded-2xl"
                src={currentPost?.image}
                alt=""
              />
            </div>
          </div>
          <div className="flex my-3" onClick={(e) => e.preventDefault()}>
            <svg
              aria-label="Like"
              color={liked ? "rgb(237, 73, 86)" : ""}
              fill={liked ? "rgb(237, 73, 86)" : "transparent"}
              height="19"
              role="img"
              viewBox="0 0 24 22"
              width="20"
              onClick={handleLikeAndUnlike}
              className={`mr-4 size-6 ${
                liked ? "svg-like bounce" : ""
              } cursor-pointer`}
            >
              <title>Like</title>
              <path
                d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"
                stroke="currentColor"
                strokeWidth="2"
              ></path>
            </svg>

            <svg
              aria-label="Comment"
              color=""
              fill=""
              height="20"
              role="img"
              viewBox="0 0 24 24"
              width="20"
              onClick={handleModal}
              className="mr-4 size-6 cursor-pointer"
            >
              <title>Comment</title>
              <path
                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>

            <svg
              aria-label="Repost"
              color="currentColor"
              fill="currentColor"
              height="20"
              role="img"
              viewBox="0 0 24 24"
              width="20"
              className="mr-4 size-6 cursor-pointer"
            >
              <title>Repost</title>
              <path
                fill=""
                d="M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z"
              ></path>
            </svg>

            <svg
              aria-label="Share"
              color=""
              fill="rgb(243, 245, 247)"
              height="20"
              role="img"
              viewBox="0 0 24 24"
              width="20"
              className="mr-4 size-6 cursor-pointer"
            >
              <title>Share</title>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="22"
                x2="9.218"
                y1="3"
                y2="10.083"
              ></line>
              <polygon
                fill="none"
                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polygon>
            </svg>
          </div>
          <div className="flex items-center mt-2 ">
            <p className="text-gray-600 text-sm">
              {currentPost?.replies.length} replies
            </p>
            <p className="mx-2 text-gray-700 text-sm">•</p>
            <p className="text-gray-600 text-sm">
              {currentPost?.likes.length} likes
            </p>
          </div>
        </div>

        {!currentPost?.replies && (
          <>
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
          </>
        )}

        {currentPost?.replies.map((reply) => (
          <Comment
            key={reply?._id}
            comment={reply?.text}
            username={reply?.username}
            avatarUrl={reply?.userProfilePic}
            lastReply={
              reply?._id ===
              currentPost?.replies[currentPost?.replies.length - 1]?._id
            }
          />
        ))}
      </div>
      {showModal && <Reply closeModal={closeModal} post={currentPost} />}
    </>
  );
};

export default PostPage;

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

const CommentSkeleton = () => {
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

          <div className="flex my-3 gap-3">
            <Skeleton className="size-[30px] rounded-full " />
            <Skeleton className="size-[30px] rounded-full " />
            <Skeleton className="size-[30px] rounded-full " />
            <Skeleton className="size-[30px] rounded-full " />
          </div>
        </div>
      </div>
    </>
  );
};
