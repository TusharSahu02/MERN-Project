import userAtom from "@/atom/userAtom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";

const NoUsers = ({ user, key }) => {
  const navigate = useNavigate();

  const [updating, setUpdating] = useState(false);
  const currentUser = useRecoilValue(userAtom);

  const [following, setFollowing] = useState(
    user?.followers.includes(currentUser._id)
  );

  return (
    <div
      className="border-[1px] size-full border-gray-700 p-3 rounded-xl hover:scale-[102%] cursor-pointer transition-all duration-300"
      onClick={(e) => {
        e.preventDefault();
        navigate(`/${user?.username}`);
      }}
    >
      <div className=" flex items-center justify-center">
        <img
          src={
            user?.profilePic
              ? user?.profilePic
              : "https://preview.redd.it/reddit-avatars-anyone-v0-0yghd1cewi0a1.png?width=587&format=png&auto=webp&s=54c04fa2f1c795ac2d5c112d5ad1a0015f696775"
          }
          alt=""
          className="size-[120px] object-cover rounded-full mt-2"
        />
      </div>
      <div className="border-b-[1px] border-gray-700 -mt-12"></div>
      <div className="mt-12 flex items-center jc flex-col">
        <h1 className="text-xl">{user.name}</h1>
        <p className="text-gray-500">@{user.username}</p>
        <p className="text-gray-400 text-sm text-center truncate max-w-[80%]">
          {user?.bio || "No bio"}
        </p>
        <p className="text-gray-400">
          {user?.followers.length}
          {"  "}
          followers
        </p>
      </div>
      <div className="border-[1px] bg-white text-black flex items-center justify-center py-2 mt-3 mx-3 rounded-xl border-gray-700">
        Follow
      </div>
    </div>
  );
};

export default NoUsers;
