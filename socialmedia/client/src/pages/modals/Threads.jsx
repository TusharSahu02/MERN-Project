import { MdOutlinePermMedia } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import usePreviewImage from "@/hooks/usePreviewImage";
import { toast } from "sonner";
import { useRecoilValue } from "recoil";
import userAtom from "@/atom/userAtom";

const MAX_CHARS = 500;

const Threads = ({ closeModal }) => {
  const [textareaValue, setTextareaValue] = useState("");
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  const user = useRecoilValue(userAtom);
  const [updating, setUpdating] = useState(false);

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

  const adjustTextareaHeight = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  const handleCreatePost = async () => {
    try {
      setUpdating(true);
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: user._id,
          text: textareaValue,
          image: imgURL,
        }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Post created successfully");
      closeModal();
      setTextareaValue("");
      setImgURL("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div ref={modalRef} className="flex items-center justify-center flex-col">
        <div className="w-full mb-4 flex items-center justify-between">
          <div></div>
          <h1 className="text-md font-bold">New thread</h1>
          <IoIosCloseCircleOutline
            size={22}
            onClick={closeModal}
            className="cursor-pointer"
          />
        </div>
        {/* outside this */}
        <div className="w-[500px]  border-[1px] max-h-[800px] overflow-scroll border-[#383b41] p-8 bg-[#1f1f21] rounded-xl">
          <div className="flex  mb-4">
            <div className="flex w-full gap-3">
              <img
                src="https://creatorspace.imgix.net/users/cltu6476600f7qh01jfaddgk0/OZZAm84WNZiQBi6W-fotor-ai-2023072804554.jpg?w=300&h=300"
                alt=""
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
              <div className="w-full">
                <h1 className="text-md font-bold">Tushar</h1>
                <textarea
                  className="bg-transparent resize-none  w-full   text-white focus:outline-none"
                  placeholder="Enter your content here..."
                  onChange={handleTextareaChange}
                  value={textareaValue}
                ></textarea>
                {/* TODO: < Add : Drag and Drop feature >*/}
                {imgURL && (
                  <div className="w-full relative flex justify-center my-2">
                    <img
                      src={imgURL}
                      alt="selected Image"
                      className="w-full object-cover"
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
                    hidden
                    ref={imageRef}
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
              className="  cursor-pointer  text-black font-bold rounded-full bg-[#fff] px-4 py-1"
              onClick={handleCreatePost}
            >
              {updating ? "uploading.." : "Post"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Threads;
