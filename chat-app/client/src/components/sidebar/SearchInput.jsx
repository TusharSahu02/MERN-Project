import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import useConversation from "../../zustand/useConversaion";
import useGetConversation from "../../../hooks/useGetConversation";
import toast from "react-hot-toast";
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    if (search.length < 3) {
      return toast.error("Please enter at least 3 characters");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No conversation found");
    }
  };



  return (
    <form className=" my-3 mx-1" onSubmit={handleSubmit}>
      <div className="flex items-center justify-start input input-bordered rounded-md bg-white border-gray-300">
        <CiSearch size={25} className="w-6 h-6 -ml-2 text-gray-400" />
        <input
          type="text"
          placeholder="Search.."
          className="h-[40px] ml-2 "
          value={search}
          onAbort={() => setSearch("")}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* <button
        type="submit"
        className="btn btn-circle bg-white text-white border-[1px] border-gray-300 hover:hover:bg-sky-200 hover:border-gray-300"
      >
        Test
      </button> */}
    </form>
  );
};

export default SearchInput;
