import { MdOutlineEmojiEmotions } from "react-icons/md";
import { HiLink } from "react-icons/hi2";
import { FaMicrophone } from "react-icons/fa";
import { useState } from "react";
import useSendMessage from "../../../hooks/useSendMessage";
import { BsSend } from "react-icons/bs";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="absolute px-4 bottom-0 h-16 w-full gap-4 border flex bg-white items-center justify-between">
        <div className="cursor-pointer">
          <MdOutlineEmojiEmotions size={30} />
        </div>
        <div className="cursor-pointer">
          <HiLink size={30} />
        </div>
        <div className=" flex bg-white border border-gray-400 focus:outline-none w-full h-12 rounded-md px-3">
          <input
            type="text"
            placeholder="Type a message.."
            className=" bg-white border focus:outline-none w-full h-full border-none px-3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="">
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <BsSend size={24} />
            )}
          </button>
        </div>
        <div className="cursor-pointer">
          <FaMicrophone size={30} />
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
