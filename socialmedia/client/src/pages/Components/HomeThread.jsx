import { useState } from "react";
import Threads from "../modals/Threads";

const HomeThread = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove("modal-open");
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="flex cursor-text border-b-[1px] pb-4 border-gray-800 items-center justify-between"
      >
        <div className="flex items-center">
          <img
            src="https://creatorspace.imgix.net/users/cltu6476600f7qh01jfaddgk0/OZZAm84WNZiQBi6W-fotor-ai-2023072804554.jpg?w=300&h=300"
            alt=""
            className="size-[40px] object-cover rounded-full"
          />
          <p className="ml-3 text-gray-500 text-sm">Start a thread..</p>
        </div>
        <div className="cursor-pointer  text-black font-bold rounded-full bg-[#ffffff50] px-4 py-1">
          Post
        </div>
      </div>
      {showModal && <Threads closeModal={closeModal} />}
    </>
  );
};

export default HomeThread;
