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
      const res = await fetch(`/api/users/follow/${user?._id}`, {
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
        user?.followers.pop();
      } else {
        toast.success(data.message, {
          duration: 2000,
        });
        user?.followers.push(currentUser._id);
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
  return (
    <div className="border-[1px] size-full border-gray-700 p-3 rounded-xl hover:scale-[102%] cursor-pointer transition-all duration-300">
      <div
        onClick={(e) => {
          e.preventDefault();
          navigate(`/${user?.username}`);
        }}
        className=" flex items-center justify-center"
      >
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
      <div
        onClick={(e) => {
          e.preventDefault();
          navigate(`/${user?.username}`);
        }}
        className="mt-12 flex items-center jc flex-col"
      >
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
      <div
        onClick={(e) => {
          e.preventDefault();
        }}
        className="mt-3"
      >
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
    </div>
  );
};

export default NoUsers;
