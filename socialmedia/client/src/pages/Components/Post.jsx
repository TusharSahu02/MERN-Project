import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IoIosMore } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const Post = ({ post, author }) => {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${author}`);
        const data = await res.json();
        // console.log(data);

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
        setUser(null);
      }
    };

    getUser();
  }, [author]);

  const isProfilePic = user?.profilePic
    ? user?.profilePic
    : "https://preview.redd.it/reddit-avatars-anyone-v0-0yghd1cewi0a1.png?width=587&format=png&auto=webp&s=54c04fa2f1c795ac2d5c112d5ad1a0015f696775";

  return (
    <Link className="flex my-3 border-b-[1px] h-full pb-7 border-gray-700">
      <div className="flex mb-4 gap-3">
        <div className="flex flex-col items-center">
          <Link
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user?.username}`);
            }}
            className="size-[40px] object-cover rounded-full cursor-pointer"
          >
            <img
              src={isProfilePic}
              alt={user?.name}
              className="size-[40px] object-cover border border-gray-500 rounded-full"
            />
          </Link>
          {post?.replies.length > 0 && (
            <div className="h-full border-l-[2px] my-2 border-gray-800"></div>
          )}
          <div className="relative w-full">
            {post?.replies[0] && (
              <img
                src={post?.replies[0]?.author?.profilePic}
                alt={post?.replies[0]?.author?.name}
                className="size-[18px] absolute left-0 border border-gray-700 object-cover rounded-full"
              />
            )}
            {post?.replies[1] && (
              <img
                src={post?.replies[1]?.author?.profilePic}
                alt={post?.replies[1]?.author?.name}
                className="size-[22px] absolute -right-2 border border-gray-700 -top-2 object-cover rounded-full"
              />
            )}
            {post?.replies[2] && (
              <img
                src={post?.replies[2]?.author?.profilePic}
                alt={post?.replies[2]?.author?.name}
                className="size-[15px] absolute top-4 border border-gray-700 left-5 object-cover rounded-full"
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full ml-3">
        <div className="flex justify-between items-center">
          <Link
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user?.username}`);
            }}
          >
            <h1 className="font-bold hover:underline transition-all duration-300 ">
              {user?.username}
            </h1>
          </Link>
          <div className="flex items-center">
            <p className="text-sm text-gray-500 mr-3">
              {formatDistanceToNow(new Date(post?.createdAt), {
                addSuffix: true,
              })}
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <IoIosMore size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#000000de] text-white">
                <DropdownMenuItem className="cursor-pointer ">
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Save
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer ">
                  Pin to profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-500">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div
          className="my-1"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/username/post/${post._id}`);
          }}
        >
          {post?.text}
        </div>
        <div
          className="w-full overflow-hidden"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/username/post/${post._id}`);
          }}
        >
          {post?.image && (
            <img
              src={`${post?.image}`}
              alt=""
              className="h-full w-full object-cover rounded-2xl border-[1px] border-gray-700"
            />
          )}
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
            onClick={() => setLiked(!liked)}
            className={`mr-4 size-6 ${liked ? "svg-like bounce" : ""}`}
          >
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
            // onClick={onOpen}
            className="mr-4 size-6"
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
            className="mr-4 size-6"
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
            className="mr-4 size-6"
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
        <div
          className="flex items-center mt-2 ml-1 "
          onClick={(e) => {
            e.preventDefault();
            navigate(`/username/post/${post._id}`);
          }}
        >
          <p className="text-gray-600 text-sm">
            {post.replies.length} comments
          </p>
          <p className="mx-2 text-gray-700 text-sm">•</p>
          <p className="text-gray-600 text-sm">
            {post.likes.length + (liked ? 1 : 0)} likes
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Post;
