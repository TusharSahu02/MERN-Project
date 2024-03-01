import { BsThreeDotsVertical } from "react-icons/bs";
import { RiChatNewLine } from "react-icons/ri";
import { HiStatusOnline } from "react-icons/hi";
const Topbar = () => {
  return (
    <>
      <div className="m-2 flex items-center justify-between relative">
        <div className="avatar online cursor-pointer ">
          <div className="w-12 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-5">
          <div className="cursor-pointer">
            <HiStatusOnline size={22} />
          </div>
          <div className="cursor-pointer">
            <RiChatNewLine size={22} />
          </div>
          <div className="cursor-pointer">
            <BsThreeDotsVertical size={22} />
          </div>
        </div>
      </div>

      {/* <div className="bg-red-500 z-30 p-4 w-[200px] absolute rounded-md -mt-1 ml-[10px]">
        <h1>Tushar</h1>
        <h1>Tushar</h1>
        <h1>Tushar</h1>
        <h1>Tushar</h1>
        <h1>Tushar</h1>
        <h1>Tushar</h1>
        <h1>Tushar</h1>
        <h1>Tushar</h1>
        <h1>Tushar</h1>
        <h1>Tushar</h1>
      </div> */}
    </>
  );
};

export default Topbar;
