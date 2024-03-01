import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  return (
    <form className=" my-3 mx-1">
      <div className="flex items-center justify-start input input-bordered rounded-md bg-white border-gray-300">
        <CiSearch size={25} className="w-6 h-6 -ml-2 text-gray-400" />
        <input type="text" placeholder="Search.." className="h-[40px] ml-2 " />
      </div>
      {/* <button
        type="submit"
        className="btn btn-circle bg-white text-white border-[1px] border-gray-300 hover:hover:bg-sky-200 hover:border-gray-300"
      >
      </button> */}
    </form>
  );
};

export default SearchInput;
