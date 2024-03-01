const CommentComponent: React.FC = () => {
  return (
    <div className="mx-auto">
      <div className="items-center justify-center">
        <div className="flex flex-col">
          <label className="mb-2 text-xl font-medium sm:text-2xl md:mb-6 lg:text-3xl">
            Leave a Comment
          </label>

          <textarea
            id="message"
            className="mb-4 h-[300px] rounded-lg border border-gray-600 bg-gray-50 p-2 text-lg md:h-[420px]"
            placeholder="What’s on your mind?"
          />

          <button className="self-end rounded-lg bg-gray-300 px-20 py-2 hover:bg-gray-400">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
