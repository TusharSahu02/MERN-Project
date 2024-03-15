import { IoIosLogOut } from "react-icons/io";
import useLogout from "../../../hooks/useLogout";

const LogoutBtn = () => {
  const { loading, logout } = useLogout();

  return (
    <>
      {!loading ? (
        <div
          className="z-20 w-full h-12 border bg-white hover:bg-sky-200 cursor-pointer transition-colors flex items-center justify-center absolute bottom-0 "
          onClick={logout}
        >
          <IoIosLogOut size={30} />
          <h2 className="ml-1 font-medium">Logout</h2>
        </div>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </>
  );
};

export default LogoutBtn;
