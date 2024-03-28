const Comment = ({ comment, username, avatarUrl, lastReply }) => {
  const isProfilePic = avatarUrl
    ? avatarUrl
    : "https://preview.redd.it/reddit-avatars-anyone-v0-0yghd1cewi0a1.png?width=587&format=png&auto=webp&s=54c04fa2f1c795ac2d5c112d5ad1a0015f696775";

  return (
    <div
      className={`mt-3 flex ${
        !lastReply ? "border-b-[1px] border-gray-800" : ""
      }  pb-4`}
    >
      <div>
        <img
          src={`${isProfilePic}`}
          alt=""
          className="size-[40px] object-cover rounded-full"
        />
      </div>
      <div className="w-full ml-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold">{username}</h1>
          </div>
        </div>
        <div>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
