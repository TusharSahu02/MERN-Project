import { BsThreeDotsVertical } from "react-icons/bs";
import { RiChatNewLine } from "react-icons/ri";
import { HiStatusOnline } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
const Topbar = () => {
  const { authUser } = useAuthContext();
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="m-2 flex items-center justify-between ">
        <div
          className="avatar  cursor-pointer relative"
          onClick={() => setShow(!show)}
        >
          <div className="w-12 rounded-full">
            <img src={authUser.profilePic} />
          </div>
        </div>
        {show && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-[99]">
            <div className="bg-white rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-6 px-12">
              <div className="absolute top-2 right-2">
                <RxCross2
                  size={28}
                  onClick={() => setShow(!show)}
                  className="cursor-pointer hover:bg-slate-100 p-1 rounded-full"
                />
              </div>
              <img src={authUser.profilePic} className="h-16 w-16" alt="" />
              <p className="mt-2">Full Name : {authUser.fullName}</p>
              <p>UserName : {authUser.username}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-5">
          <div className="cursor-pointer">
            <HiStatusOnline size={22} />
          </div>
          <div className="cursor-pointer">
            <RiChatNewLine size={22} />
          </div>
          <div className="cursor-pointer">
            <BsThreeDotsVertical size={22} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
