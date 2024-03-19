import { CiSearch } from "react-icons/ci";
import ProfileCard from "./Components/ProfileCard";

const Search = () => {
  return (
    <>
      <div className="flex mb-6 items-center  border-[1px] border-gray-800 rounded-xl p-4">
        <CiSearch size={22} className=" text-gray-600" />
        <input
          type="text"
          className="w-full ml-3 bg-transparent text-white focus:outline-none placeholder:text-gray-500"
          placeholder="Search"
        />
      </div>
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
    </>
  );
};

export default Search;
