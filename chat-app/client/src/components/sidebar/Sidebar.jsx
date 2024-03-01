import Topbar from "../topbar/Topbar";
import Conversations from "./Conversations";
import LogoutBtn from "./LogoutBtn";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="relative h-full border-r">
      <Topbar/>
      <SearchInput />
      <div className=" border-b mb-2"></div>
      <Conversations />
      <LogoutBtn />
    </div>
  );
};

export default Sidebar;
