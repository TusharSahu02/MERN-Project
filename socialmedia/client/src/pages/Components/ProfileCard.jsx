const ProfileCard = () => {
  return (
    <div className="flex items-center pb-2 border-b-[1px] border-gray-800 cursor-pointer my-3 justify-between">
      <div className="flex">
        <div className="size-[50px] rounded-full">
          <img
            className="size-full object-cover rounded-full"
            src="https://creatorspace.imgix.net/users/cltu6476600f7qh01jfaddgk0/OZZAm84WNZiQBi6W-fotor-ai-2023072804554.jpg?w=300&h=300"
            alt=""
          />
        </div>
        <div className="ml-3 ">
          <h1 className=" font-semibold">Tushar Sahu</h1>
          <p className=" text-gray-500 leading-none ">username_</p>
          <p className="mt-2">10.2k followers</p>
        </div>
      </div>
      <div className="border-[1px]  border-gray-700 px-6 py-2 rounded-xl">
        Follow
      </div>
    </div>
  );
};

export default ProfileCard;
