const Conversation = () => {
  return (
    <>
      <div className="flex gap-2 items-center hover:bg-sky-200 rounded px-2 mr-2 py-2  cursor-pointer transition-colors border-gray-200 border my-1 ml-3 ">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex items-center ">
            <p className="font-bold text-black">Tushar Sahu</p>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Conversation;
