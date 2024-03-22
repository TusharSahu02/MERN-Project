import { useEffect, useState } from "react";
import ProfileHeader from "./Components/ProfileHeader";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { profile } = useParams();

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
      }
    };
    getUser();
  }, [profile]);

  if (!user) return null;

  

  return (
    <>
      <ProfileHeader user={user} />
    </>
  );
};

export default Profile;
