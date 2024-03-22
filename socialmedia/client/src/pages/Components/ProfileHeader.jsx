import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRef, useState } from "react";

import { toast } from "sonner";

import { IoMdMore } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Threads from "./Threads";
import Replies from "./Replies";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "@/atom/userAtom";

import { MdModeEditOutline } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import Settings from "../modals/Settings";
import Profile from "../modals/Profile";
import usePreviewImage from "@/hooks/usePreviewImage";

const ProfileHeader = ({ user }) => {
  const [userEdit, setUserEdit] = useRecoilState(userAtom);
  const [activeTab, setActiveTab] = useState("threads");
  const [showModal, setShowModal] = useState(false);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const setUser = useSetRecoilState(userAtom);

  const [inputs, setInputs] = useState({
    name: userEdit.name,
    username: userEdit.username,
    email: userEdit.email,
    bio: userEdit.bio,
  });

  const [updating, setUpdating] = useState(false);

  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser._id)
  );

  const fileRef = useRef(null);

  const { handleImageChange, imgURL } = usePreviewImage();

  const isProfilePic = userEdit?.profilePic
    ? userEdit?.profilePic
    : "https://preview.redd.it/reddit-avatars-anyone-v0-0yghd1cewi0a1.png?width=587&format=png&auto=webp&s=54c04fa2f1c795ac2d5c112d5ad1a0015f696775";

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast("Copied to clipboard", {
        icon: "📋",
        duration: 2000,
      });
    });
  };
  const handleFollowAndUnfollow = async () => {
    if (!currentUser) {
      toast.error("Please login first", {
        duration: 2000,
      });
      return;
    }
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error, {
          duration: 2000,
        });
        return;
      }
      if (following) {
        toast.success(data.message, {
          duration: 2000,
        });
        user.followers.pop();
      } else {
        toast.success(data.message, {
          duration: 2000,
        });
        user.followers.push(currentUser._id);
      }
      setFollowing(!following);
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleTextareaChange = (event) => {
    setInputs({ ...inputs, bio: event.target.value });
    adjustTextareaHeight(event.target);
  };

  const adjustTextareaHeight = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
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

      if (data.error) {
        toast.error(data.error, {
          duration: 2000,
        });
        return;
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

  const handleModal = () => {
    setShowModal(true);
    document.body.classList.add("modal-open");
  };
  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove("modal-open");
  };
  const handleProfileModal = () => {
    setShowProfileModal(true);
    document.body.classList.add("modal-open");
  };
  const closeProfileModal = () => {
    setShowProfileModal(false);
    document.body.classList.remove("modal-open");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const res = await fetch(`/api/users/update/${userEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imgURL }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error, {
          duration: 2000,
        });
        return;
      }

      toast.success("Profile Updated Successfully, reload to see the changes", {
        duration: 2000,
      });
      setUser(data);
      localStorage.setItem("user-chipper", JSON.stringify(data));
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="w-[80%]">
          <h1 className="text-2xl font-bold cursor-pointer">{userEdit.name}</h1>
          <div className="flex items-center">
            <p className=" text-md">{userEdit.username}</p>
            <div className="ml-1 px-3 py-1 text-[12px] rounded-full bg-gray-800 cursor-pointer">
              <p className="text-[#6B7280]">threads.net</p>
            </div>
          </div>
        </div>
        <div
          className="size-[90px]  rounded-full cursor-pointer"
          onClick={handleProfileModal}
        >
          <img
            className="h-full hover:opacity-50 transition-opacity duration-300  border-[1px] border-gray-700 w-full object-cover rounded-full"
            src={isProfilePic}
            alt=""
          />
        </div>
      </div>
      <div>
        <p>{userEdit.bio}</p>
      </div>
      <div className="my-3 flex items-center justify-between"testing  >
        <p className="text-sm text-gray-400 hover:underline transition-all w-max cursor-pointer">
          {user.followers.length} followers
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IoMdMore size={22} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#000000a3] text-white">
            <DropdownMenuItem onClick={copyUrl} className="cursor-pointer ">
              copy URL
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Saved
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer " onClick={handleModal}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer "
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {currentUser._id !== user._id && (
        <div className="flex justify-center items-center">
          {following ? (
            <Button
              onClick={handleFollowAndUnfollow}
              className="bg-transparent text-white border w-full  hover:bg-white hover:text-black transition-colors duration-300 "
              disabled={updating}
            >
              {updating ? "loading.." : "Unfollow"}
            </Button>
          ) : (
            <Button
              onClick={handleFollowAndUnfollow}
              className="bg-white text-black w-full hover:bg-black hover:text-white transition-colors duration-300 hover:border"
              disabled={updating}
            >
              {updating ? "loading.." : "Follow"}
            </Button>
          )}
        </div>
      )}

      {currentUser._id === user._id && (
        <Dialog>
          <div className="flex items-center justify-center  border-[1px] border-gray-700 py-1 rounded-lg text-sm cursor-pointer">
            <DialogTrigger className="size-full"> Edit profile</DialogTrigger>
            <DialogContent className="bg-black">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="size-full cursor-pointer flex items-center justify-center">
                  <div className="relative ">
                    <img
                      className="size-[100px] object-cover rounded-full hover:opacity-50 transition-opacity duration-300"
                      src={imgURL || isProfilePic}
                      alt=""
                      onClick={() => fileRef.current.click()}
                    />
                    <input
                      type="file"
                      hidden
                      ref={fileRef}
                      onChange={handleImageChange}
                    />

                    <div className="top-0 -right-2 size-8 flex items-center justify-center rounded-full bg-[#000000a3] absolute ml-3 ">
                      <MdModeEditOutline size={22} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Username
                  </Label>
                  <Input
                    disabled
                    defaultValue={`@${inputs.username}`}
                    className="col-span-3 bg-black"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Email
                  </Label>
                  <Input
                    disabled
                    defaultValue={inputs.email}
                    className="col-span-3 bg-black"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    className="col-span-3 bg-black"
                    value={inputs.name}
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Bio
                  </Label>
                  <Textarea
                    className="col-span-3  bg-black"
                    onChange={handleTextareaChange}
                    value={inputs.bio}
                    placeholder="Add a bio"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleSubmit}
                  disabled={updating}
                  className="bg-white border-white border-[1px] text-black hover:bg-transparent hover:text-white hover:border-[1px] hover:border-white transition-colors duration-300"
                >
                  {updating ? "loading..." : "Save changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </div>
        </Dialog>
      )}

      <div className="flex">
        <div
          className={`flex-1 items-center  flex  border-b-[1px]  justify-center py-3 cursor-pointer ${
            activeTab === "threads"
              ? "text-white "
              : "text-gray-500  border-gray-500"
          }`}
          onClick={() => handleTabChange("threads")}
        >
          Threads
        </div>
        <div
          className={`flex-1 items-center flex border-b-[1px] justify-center py-3 cursor-pointer ${
            activeTab === "replies"
              ? "text-white "
              : "text-gray-500  border-gray-500"
          }`}
          onClick={() => handleTabChange("replies")}
        >
          Replies
        </div>
      </div>
      <div
        className="bg-white transition-all duration-300"
        style={{
          width: "50%",
          height: "1px",
          transform:
            activeTab === "threads" ? "translateX(0)" : "translateX(100%)",
        }}
      ></div>
      {activeTab === "threads" && <Threads />}
      {activeTab === "replies" && <Replies />}
      {showModal && <Settings closeModal={closeModal} />}
      {showProfileModal && (
        <Profile
          closeProfileModal={closeProfileModal}
          isProfilePic={isProfilePic}
        />
      )}
    </div>
  );
};

export default ProfileHeader;
