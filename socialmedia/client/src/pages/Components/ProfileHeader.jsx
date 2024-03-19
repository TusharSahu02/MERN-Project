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

import React, { useState } from "react";

import { toast } from "sonner";

import { IoMdMore } from "react-icons/io";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Threads from "./Threads";
import Replies from "./Replies";

const ProfileHeader = () => {
  const [activeTab, setActiveTab] = useState("threads");

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

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="w-[80%]">
          <h1 className="text-2xl font-bold cursor-pointer">Tushar</h1>
          <div className="flex items-center">
            <p className=" text-md">username_</p>
            <div className="ml-1 px-3 py-1 text-[12px] rounded-full bg-gray-800 cursor-pointer">
              <p className="text-[#6B7280]">threads.net</p>
            </div>
          </div>
        </div>
        <div className="size-[90px]  rounded-full cursor-pointer">
          <img
            className="h-full w-fill object-cover rounded-full"
            src="https://creatorspace.imgix.net/users/cltu6476600f7qh01jfaddgk0/OZZAm84WNZiQBi6W-fotor-ai-2023072804554.jpg?w=300&h=300"
            alt=""
          />
        </div>
      </div>
      <div>
        <p>loading........</p>
      </div>
      <div className="my-3 flex items-center justify-between">
        <p className="text-sm text-gray-400 hover:underline transition-all w-max cursor-pointer">
          25 followers
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
            <DropdownMenuItem className="cursor-pointer ">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer ">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog>
        <div className="flex items-center justify-center  border-[1px] border-gray-700 py-1 rounded-lg text-sm cursor-pointer">
          <DialogTrigger className="size-full"> Edit profile</DialogTrigger>
          <DialogContent className="bg-black">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3 bg-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3 bg-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Bio
                </Label>
                <Input
                  id="username"
                  defaultValue="loading..."
                  className="col-span-3 bg-black"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>

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
    </div>
  );
};

export default ProfileHeader;
