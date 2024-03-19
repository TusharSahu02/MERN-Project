import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import Comment from "./Components/Comment";

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <div>
      <div className=" border-b-[1px] border-gray-800 pb-3">
        <div className="size-[40px] items-center flex justify-center rounded-full hover:bg-gray-800 cursor-pointer">
          <IoArrowBackOutline size={24} />
        </div>
      </div>
      <div className="border-b-[1px] border-gray-800 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://avatar.iran.liara.run/public/boy"
              alt=""
              className="size-[40px] object-cover rounded-full"
            />
            <h1 className="ml-3 font-semibold">Tushar Sahu</h1>
          </div>
          <div className="flex">
            <p className="text-gray-500 text-sm mr-3">1d</p>
            <IoIosMore size={22} />
          </div>
        </div>
        <div className="py-2">
          <p>
            Dear Threads Algorithm I'm looking to connect with people in these
            fields 💻: • Frontend Developer • Backend Developer • Mobile
            Developer (Android & iOS) • Full stack Developer • Java Developer •
            Python Developer • Flutter Developer • C++ Developer • Software
            Engineer • Software Developer • DevOps Engineer • Cloud Engineer
            Bump here and let&apos;s connect 😎✨
          </p>
          <div className="mt-3">
            <img
              className="w-full"
              src="https://creatorspace.imgix.net/users/cltu6476600f7qh01jfaddgk0/OZZAm84WNZiQBi6W-fotor-ai-2023072804554.jpg?w=300&h=300"
              alt=""
            />
          </div>
        </div>
        <div className="flex my-3">
          <svg
            aria-label="Like"
            color={liked ? "rgb(237, 73, 86)" : ""}
            fill={liked ? "rgb(237, 73, 86)" : "transparent"}
            height="19"
            role="img"
            viewBox="0 0 24 22"
            width="20"
            onClick={() => setLiked(!liked)}
            className={`mr-4 size-6 cursor-pointer ${
              liked ? "svg-like bounce" : ""
            }`}
          >
            <path
              d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"
              stroke="currentColor"
              strokeWidth="2"
            ></path>
          </svg>

          <Link to={"/search"}>
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
          </Link>

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
          <p className="text-gray-600 text-sm">65 replies</p>
          <p className="mx-2 text-gray-700 text-sm">•</p>
          <p className="text-gray-600 text-sm">{23 + (liked ? 1 : 0)} likes</p>
        </div>
      </div>
      <Comment
        comment={"That's Amazing"}
        createAt={"2d"}
        likes={"329"}
        replies={"10"}
        username={"Johndoe"}
        avatarUrl="https://creatorspace.imgix.net/users/cltu6476600f7qh01jfaddgk0/OZZAm84WNZiQBi6W-fotor-ai-2023072804554.jpg?w=300&h=300"
      />
      <Comment
        comment={"Very nice"}
        createAt={"1d"}
        likes={"119"}
        replies={"30"}
        username={"ManjuSahu"}
        avatarUrl="https://creatorspace.imgix.net/users/cltu6476600f7qh01jfaddgk0/OZZAm84WNZiQBi6W-fotor-ai-2023072804554.jpg?w=300&h=300"
      />
      <Comment
        comment={"That's cool"}
        createAt={"2d"}
        likes={"5349"}
        replies={"133"}
        username={"Shivamsharma"}
        avatarUrl="https://creatorspace.imgix.net/users/cltu6476600f7qh01jfaddgk0/OZZAm84WNZiQBi6W-fotor-ai-2023072804554.jpg?w=300&h=300"
      />
      <Comment
        comment={"That's Amazing"}
        createAt={"2d"}
        likes={"329"}
        replies={"10"}
        username={"Johndoe"}
        avatarUrl="https://creatorspace.imgix.net/users/cltu6476600f7qh01jfaddgk0/OZZAm84WNZiQBi6W-fotor-ai-2023072804554.jpg?w=300&h=300"
      />
    </div>
  );
};

export default PostPage;
