const Replies = () => {
  return (
    <div className="size-full">
      <NoReplies />
    </div>
  );
};

export default Replies;

const NoReplies = () => {
  return (
    <div className="flex flex-col mt-36 text-gray-500 text-sm justify-center items-center size-full">
      <p>No replies yet</p>
      <p>( haven&apos;t implemented this feature yet )</p>
    </div>
  );
};
