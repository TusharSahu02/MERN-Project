import { MdOutlinePermMedia } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState, useRef, useEffect } from "react";

const Threads = ({ closeModal }) => {
  const [textareaValue, setTextareaValue] = useState("");
  const modalRef = useRef(null);

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
  }, []);

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
    adjustTextareaHeight(event.target);
  }; 

  const adjustTextareaHeight = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
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

                <MdOutlinePermMedia
                  size={22}
                  className="text-gray-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <div className="  cursor-pointer  text-black font-bold rounded-full bg-[#fff] px-4 py-1">
              Post
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Threads;
