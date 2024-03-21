import { useState } from "react";

import { BsThreads } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import Threads from "../modals/Threads";
import { toast } from "sonner";
import userAtom from "@/atom/userAtom";
import { useSetRecoilState } from "recoil";

const Topbar = () => {
  const [activeIcon, setActiveIcon] = useState("");
  const [showModal, setShowModal] = useState(false);

  const setUser = useSetRecoilState(userAtom);

  const handleClick = (iconName) => {
    setActiveIcon(iconName);
  };
  const handleModal = () => {
    setShowModal(true);
    document.body.classList.add("modal-open");
  };
  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove("modal-open");
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      if (data.error) {
        toast.error(data.error, {
          duration: 2000,
        });
      }
      localStorage.removeItem("user-chipper");
      // window.location.reload();
      setUser(null);
      toast.success(data.message, {
        duration: 2000,
      });
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  return (
    <div className="fixed top-0 container left-1/2  transform -translate-x-1/2 translate-y-[0] z-10 bg-black text-white">
      <div className="flex justify-between items-center py-1 px-16">
        <Link
          to={"/"}
          className={`cursor-pointer ${activeIcon === "home" && "text-white"}`}
          onClick={() => handleClick("home")}
        >
          <BsThreads size={32} />
        </Link>
        <div className="flex items-center justify-between w-[500px]">
          <Link
            to={"/"}
            className={`h-[60px] w-[90px] flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-900 ${
              activeIcon === "home" && "text-white"
            }`}
            onClick={() => handleClick("home")}
          >
            {" "}
            <GrHomeRounded
              size={26}
              fill={activeIcon === "home" ? "white" : ""}
              color={activeIcon === "home" ? "white" : "#635f5f"}
            />
          </Link>
          <Link
            to={"/search"}
            className={`h-[60px] w-[90px] flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-900 ${
              activeIcon === "search" && "text-white"
            }`}
            onClick={() => handleClick("search")}
          >
            <FiSearch
              size={26}
              color={activeIcon === "search" ? "white" : "#635f5f"}
            />
          </Link>
          <div
            className={`h-[60px] w-[90px] flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-900 `}
            onClick={handleModal}
          >
            <IoCreateOutline size={28} color={"#635f5f"} />
          </div>
          <Link
            to={"/activity"}
            className={`h-[60px] w-[90px] flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-900 ${
              activeIcon === "activity" && "text-white"
            }`}
            onClick={() => handleClick("activity")}
          >
            <LuHeart
              size={26}
              fill={activeIcon === "activity" ? "white" : ""}
              color={activeIcon === "activity" ? "white" : "#635f5f"}
            />
          </Link>
          <Link
            to={"/profile"}
            className={`h-[60px] w-[90px] flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-900 ${
              activeIcon === "profile" && "text-white"
            }`}
            onClick={() => handleClick("profile")}
          >
            <CiUser
              size={26}
              fill={activeIcon === "profile" ? "white" : "#635f5f"}
              color={activeIcon === "profile" ? "white" : "#635f5f"}
            />
          </Link>
        </div>
        <div onClick={handleLogout}>
          <FiLogOut size={26} color="#635f5f" className=" cursor-pointer" />
        </div>
      </div>
      {showModal && <Threads closeModal={closeModal} />}
    </div>
  );
};

export default Topbar;
