import { IoIosLogOut } from "react-icons/io";

const LogoutBtn = () => {
  return (
    <div className="z-20 w-full h-12 border bg-white hover:bg-sky-200 cursor-pointer transition-colors flex items-center justify-center absolute bottom-0 ">
      <IoIosLogOut size={30} />
      <h2 className="ml-1 font-medium">Logout</h2>
    </div>
  );
};

export default LogoutBtn;
