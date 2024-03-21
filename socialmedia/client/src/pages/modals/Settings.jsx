import { MdOutlinePermMedia } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import userAtom from "@/atom/userAtom";
import { useRecoilState } from "recoil";
import { Input } from "@/components/ui/input";

const Settings = ({ closeModal }) => {
  const [userEdit, setUserEdit] = useRecoilState(userAtom);
  const modalRef = useRef(null);
  const [password, setPassword] = useState("");

  const isProfilePic = userEdit.profilePic
    ? userEdit.profilePic
    : "https://preview.redd.it/reddit-avatars-anyone-v0-0yghd1cewi0a1.png?width=587&format=png&auto=webp&s=54c04fa2f1c795ac2d5c112d5ad1a0015f696775";

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

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div ref={modalRef} className="flex items-center justify-center flex-col">
        <div className="w-full mb-4 flex items-center justify-between">
          <div></div>
          <h1 className="text-md font-bold">Settings</h1>
          <IoIosCloseCircleOutline
            size={22}
            onClick={closeModal}
            className="cursor-pointer"
          />
        </div>

        <div className="w-[500px]  border-[1px] max-h-[800px] overflow-scroll border-[#383b41] p-8 bg-[#1f1f21] rounded-xl">
          <div className="flex  mb-4">
            <div className="flex w-full gap-3">
              <img
                src={isProfilePic}
                alt=""
                className="size-[60px] border-[1px] border-gray-700 object-cover rounded-full"
              />
              <div className="w-full">
                <p className="text-sm text-gray-500">@{userEdit.username}</p>
                <h1 className="text-md font-bold">{userEdit.name}</h1>
                <div className="border-b-[1px] border-gray-700 w-full my-3"></div>
                <label>Change your password</label>
                <Input
                  className="bg-black mt-3 border-gray-700"
                  placeholder="Enter your new password"
                />
                <Input
                  className="bg-black mt-2 border-gray-700"
                  placeholder="re-type your new password"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <div className="  cursor-pointer  text-black font-bold rounded-full bg-[#fff] px-4 py-1">
              Save Changes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
