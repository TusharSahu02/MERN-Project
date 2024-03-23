import userAtom from "@/atom/userAtom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";

const ProfileCard = ({
  id,
  username,
  name,
  profilePic,
  followers,
  // following,
}) => {
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(
    followers.includes(currentUser._id)
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
      const res = await fetch(`/api/users/follow/${id}`, {
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
        followers.pop();
      } else {
        toast.success(data.message, {
          duration: 2000,
        });
        followers.push(currentUser._id);
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

  const isProfilePic = profilePic
    ? profilePic
    : "https://preview.redd.it/reddit-avatars-anyone-v0-0yghd1cewi0a1.png?width=587&format=png&auto=webp&s=54c04fa2f1c795ac2d5c112d5ad1a0015f696775";

  return (
    <div className="flex items-center pb-2 border-b-[1px] border-gray-800 cursor-pointer my-3 justify-between">
      <div
        className="flex"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/${username}`);
        }}
      >
        <div className="size-[50px] rounded-full">
          <img
            className="size-full object-cover rounded-full"
            src={isProfilePic}
            alt=""
          />
        </div>
        <div className="ml-3 ">
          <h1 className=" font-semibold">{name}</h1>
          <p className=" text-gray-500 leading-none ">{username}</p>
          <p className="mt-2">{followers?.length} followers</p>
        </div>
      </div>
      <div
        className="pr-6 "
        onClick={(e) => {
          e.preventDefault();
        }}
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

export default ProfileCard;
