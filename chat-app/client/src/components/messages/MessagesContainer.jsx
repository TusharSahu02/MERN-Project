import { BsThreeDotsVertical } from "react-icons/bs";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useConversation from "../../zustand/useConversaion";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useGetConversation from "../../../hooks/useGetConversation";
const MessagesContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function to unmount
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation?._id);

  return (
    <div className="flex flex-col h-full w-full relative">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center  justify-between px-3 py-2 border-b">
            <div className="flex gap-3">
              <div className="avatar cursor-pointer">
                <div className="w-12 rounded-full">
                  <img src={selectedConversation.profilePic} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-medium">
                  {selectedConversation.fullName}
                </h2>
                <p>
                  {isOnline ? (
                    <span className="text-green-500">Online</span>
                  ) : (
                    <span className="text-red-500">Offline</span>
                  )}
                </p>
              </div>
            </div>
            <div className="cursor-pointer">
              <BsThreeDotsVertical size={22} />
            </div>
          </div>
          {/* Messages */}
          <Messages />
          {/* Msg Input */}
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessagesContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center">
        <img src="img/chat.svg" alt="" className="h-[250px] w-[400px]" />
        <p className="text-xl">
          Welcome,
          <span className="text-blue-500 font-bold ml-2">
            {authUser.fullName}
          </span>
        </p>
        <p className="text-xl">Select a chat to start conversation</p>
      </div>
    </div>
  );
};
