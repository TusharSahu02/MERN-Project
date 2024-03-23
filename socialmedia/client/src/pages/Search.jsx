import { CiSearch } from "react-icons/ci";
import ProfileCard from "./Components/ProfileCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Search = () => {
  // const [loading, setLoading] = useState(true);

  const [users, setUser] = useState([]);
  const [searchUsers, setSearchUser] = useState([]);
  const [show, setShow] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await fetch("/api/users/allusers");
        const data = await res.json();
        if (data.error) {
          toast.error(data.error, {
            duration: 2000,
          });
          return;
        }
        setUser(data);
        // console.log(data);
      } catch (error) {
        toast.error(error.message, {
          duration: 2000,
        });
      } finally {
        // setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  const handleFindUser = async (e) => {
    setShow(false);
    const query = e.target.value;

    if (!query || query === "") {
      setSearchUser([]);
      setShow(true);
      setShowText(false);
      return;
    }
    try {
      const searchCharacters = query.split("");
      if (searchCharacters.length < 3) {
        setSearchUser([]);
        setShowText(false);
        return;
      }
      const searchUsersData = users.filter((user) => {
        const q = user.username.toLowerCase();
        return q.includes(query.toLowerCase());
      });
      setSearchUser(searchUsersData);
      // console.log(searchUsersData);
      // console.log(searchUsersData.length);

      if (searchUsersData.length === 0) {
        setShowText(true);
      }
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  return (
    <>
      <div className="flex mb-6 items-center  border-[1px] border-gray-800 rounded-xl p-4">
        <CiSearch size={22} className=" text-gray-600" />
        <input
          type="text"
          className="w-full ml-3 bg-transparent text-white focus:outline-none placeholder:text-gray-500"
          placeholder="Search"
          onChange={handleFindUser}
        />
      </div>

      {show &&
        users?.map((user) => (
          <>
            <ProfileCard
              key={user._id}
              username={user?.username}
              name={user?.name}
              followers={user?.followers}
              following={user?.following}
              profilePic={user?.profilePic}
              id={user._id}
            />
          </>
        ))}

      {showText ? <p className="text-center text-white">No user found</p> : ""}

      {searchUsers?.map((user) => (
        <>
          <ProfileCard
            key={user._id}
            username={user?.username}
            name={user?.name}
            followers={user?.followers}
            following={user?.following}
            profilePic={user?.profilePic}
            id={user._id}
          />
        </>
      ))}
    </>
  );
};

export default Search;
