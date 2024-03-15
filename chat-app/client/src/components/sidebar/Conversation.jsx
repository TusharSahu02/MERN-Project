import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversaion";

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-200 rounded px-2 mr-2 py-2  cursor-pointer transition-colors border-gray-200 border my-1 ml-3 
        ${isSelected ? "bg-sky-200" : ""}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""} `}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex items-center ">
            <p className="font-bold text-black">{conversation.fullName}</p>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Conversation;
