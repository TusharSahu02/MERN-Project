import { MdOutlinePermMedia } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import usePreviewImage from "@/hooks/usePreviewImage";
import { toast } from "sonner";
import { useRecoilValue } from "recoil";
import userAtom from "@/atom/userAtom";

const MAX_CHARS = 500;

const Reply = ({ closeModal, post: post_ }) => {
  const [textareaValue, setTextareaValue] = useState("");

  const modalRef = useRef(null);
  const imageRef = useRef(null);

  const user = useRecoilValue(userAtom);
  const [postUser, setPostUser] = useState("");
  const [updating, setUpdating] = useState(false);

  const [post, setPost] = useState(post_);

  const [remainingChars, setRemainingChars] = useState(MAX_CHARS);
  const { handleImageChange, imgURL, setImgURL } = usePreviewImage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${post?.author}`);
        const data = await res.json();

        if (data.error) {
          toast.error(data.error, {
            duration: 2000,
          });
          return;
        }

        setPostUser(data);
      } catch (error) {
        toast.error(error, {
          duration: 2000,
        });
      }
    };

    fetchUser();

    return () => {
      setPostUser(null);
    };
  }, [post?.author]);

  const handleReply = async () => {
    if (!user) {
      toast.error("Please login first", {
        duration: 2000,
      });
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch(`/api/posts/reply/${post?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textareaValue }),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error, {
          duration: 2000,
        });
        return;
      }

      setPost({ ...post, replies: [...post?.replies, data?.reply] });

      toast.success("Reply posted successfully", {
        duration: 2000,
      });
      console.log(data);

      setImgURL("");
      setTextareaValue("");
      closeModal();
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleTextareaChange = (event) => {
    const inputText = event.target.value;
    if (inputText.length > MAX_CHARS) {
      toast.message("You can't post more than 500 characters.", {
        duration: 2000,
        position: "top-center",
      });
      const truncatedText = inputText.slice(0, MAX_CHARS);
      setTextareaValue(truncatedText);
      setRemainingChars(0);
    } else {
      setTextareaValue(inputText);
      setRemainingChars(MAX_CHARS - inputText.length);
    }
    adjustTextareaHeight(event.target);
  };

  const isCurrentProfilePic = user?.profilePic
    ? user?.profilePic
    : "https://preview.redd.it/reddit-avatars-anyone-v0-0yghd1cewi0a1.png?width=587&format=png&auto=webp&s=54c04fa2f1c795ac2d5c112d5ad1a0015f696775";

  const isProfilePic = postUser?.profilePic
    ? postUser?.profilePic
    : "https://preview.redd.it/reddit-avatars-anyone-v0-0yghd1cewi0a1.png?width=587&format=png&auto=webp&s=54c04fa2f1c795ac2d5c112d5ad1a0015f696775";

  const adjustTextareaHeight = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div ref={modalRef} className="flex items-center justify-center flex-col">
        <div className="w-full mb-4 flex items-center justify-between">
          <div></div>
          <h1 className="text-md font-bold">Reply</h1>
          <IoIosCloseCircleOutline
            size={22}
            onClick={closeModal}
            className="cursor-pointer"
          />
        </div>
        <div className="w-[500px]  border-[1px] max-h-[800px] overflow-scroll border-[#383b41] p-8 bg-[#1f1f21] rounded-xl">
          <div className="flex  w-full">
            <div className="flex w-full gap-3">
              <div className="flex flex-col items-center">
                <img
                  src={isProfilePic}
                  alt=""
                  className="w-[50px] border border-gray-500 h-[50px] object-cover rounded-full"
                />
                <div className="h-full border-l-[2px] my-2 border-gray-500"></div>
              </div>
              <div className="w-[90%]">
                <h1 className="text-md font-bold">{postUser?.username}</h1>
                <p className="my-1">{post?.text}</p>
                {post?.image && (
                  <div className="w-full flex justify-center mb-3">
                    <img
                      src={post?.image}
                      alt="selected Image"
                      className="w-full object-cover rounded-xl"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2 w-full">
                <img
                  src={isCurrentProfilePic}
                  alt=""
                  className="w-[50px] h-[50px] object-cover rounded-full"
                />

                <div className="w-[90%]">
                  <h1 className="text-md font-bold">{user?.username}</h1>
                  <textarea
                    className="bg-transparent resize-none  w-full   text-white focus:outline-none"
                    placeholder={`Reply to ${postUser?.username}...`}
                    onChange={handleTextareaChange}
                    value={textareaValue}
                    autoFocus
                  ></textarea>

                  {imgURL && (
                    <div className="w-full relative flex justify-center mb-2">
                      <img
                        src={imgURL}
                        alt="selected Image"
                        className="w-full object-cover rounded-xl"
                      />
                      <div className=" size-7 flex items-center justify-center bg-gray-600 rounded-full absolute top-0 right-0">
                        <IoIosCloseCircleOutline
                          size={24}
                          color="#a7a0a0"
                          onClick={() => {
                            setImgURL("");
                          }}
                          className="cursor-pointer "
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <MdOutlinePermMedia
                      size={22}
                      onClick={() => imageRef.current?.click()}
                      className="text-gray-500 cursor-pointer"
                    />
                    <input
                      type="file"
                      onClick={() => imageRef.current?.click()}
                      ref={imageRef}
                      hidden
                      onChange={handleImageChange}
                    />
                    <p className="text-gray-500 text-xs">
                      {remainingChars} / {MAX_CHARS}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <div
                onClick={handleReply}
                className="  cursor-pointer  text-black font-bold rounded-full bg-[#fff] px-4 py-1"
              >
                {updating ? "replying..." : "Reply"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
