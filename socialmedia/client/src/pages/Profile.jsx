import { useEffect, useState } from "react";
import ProfileHeader from "./Components/ProfileHeader";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { profile } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${profile}`);
        const data = await res.json();

        if (data.error) {
          toast.error(data.error, {
            duration: 2000,
          });
          return;
        }

        setUser(data);
      } catch (error) {
        toast.error(error, {
          duration: 2000,
        });
      } finally {
        // console.log("Setting loading to false");
        setLoading(false);
      }
    };
    getUser();
  }, [profile]);

  // console.log("User:", user, "Loading:", loading);

  if (!user && loading) {
    return <ProfileSkeletion />;
  }

  if (!user && !loading) {
    return (
      <>
        <h1 className="text-center text-gray-700 text-lg font-medium">
          User not found
        </h1>
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <ProfileHeader user={user} />
    </>
  );
};

export default Profile;

const ProfileSkeletion = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="w-[80%] space-y-2">
          <Skeleton className="h-6 w-[50%] " />
          <div className="flex items-center w-full">
            <Skeleton className="h-6 w-[60%]" />
          </div>
        </div>
        <div className="size-[90px]  rounded-full cursor-pointer">
          <Skeleton className="size-full rounded-full" />
        </div>
      </div>
      <Skeleton className="h-4 w-[70%]" />
      <div className="my-3 flex items-center justify-between">
        <Skeleton className="h-3 w-[200px]" />
      </div>

      <div className="flex justify-center items-center">
        <Skeleton className="h-8 w-full" />
      </div>

      <div className="flex gap-3">
        <div
          className={`flex-1 items-center  flex  border-b-[1px]  justify-center py-3 cursor-pointer `}
        >
          <Skeleton className="h-8 w-full" />
        </div>
        <div
          className={`flex-1 items-center flex border-b-[1px] justify-center py-3 cursor-pointer `}
        >
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </>
  );
};
