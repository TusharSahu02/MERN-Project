import { useState } from "react";
import Threads from "../modals/Threads";
import userAtom from "@/atom/userAtom";
import { useRecoilState } from "recoil";

const HomeThread = () => {
  const [showModal, setShowModal] = useState(false);
  const [userEdit] = useRecoilState(userAtom);
  const isProfilePic = userEdit.profilePic
    ? userEdit.profilePic
    : "https://preview.redd.it/reddit-avatars-anyone-v0-0yghd1cewi0a1.png?width=587&format=png&auto=webp&s=54c04fa2f1c795ac2d5c112d5ad1a0015f696775";
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
            src={isProfilePic}
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
