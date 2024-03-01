import { MdOutlineEmojiEmotions } from "react-icons/md";
import { HiLink } from "react-icons/hi2";
import { FaMicrophone } from "react-icons/fa";
const MessageInput = () => {
  return (
    <div className="absolute px-4 bottom-0 h-16 w-full gap-4 border flex bg-white items-center justify-between">
      <div className="cursor-pointer">
        <MdOutlineEmojiEmotions size={30} />
      </div>
      <div className="cursor-pointer">
        <HiLink size={30} />
      </div>
      <input
        type="text"
        placeholder="Type a message.."
        className=" bg-white border border-gray-400 focus:outline-none w-full h-12 rounded-md px-3"
      />
      <div className="cursor-pointer">
        <FaMicrophone size={30} />
      </div>
    </div>
  );
};

export default MessageInput;
