import { useState } from "react";
import { Modal } from "~/components/Modal";

const CommentComponent: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const commentClick = () => {
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

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

          <button
            className="self-end rounded-lg bg-gray-300 px-20 py-2 hover:bg-gray-400"
            onClick={commentClick}
          >
            Post
          </button>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message="Please log in as a user to comment."
        bgColor="bg-gray-700 text-white"
      />
    </div>
  );
};

export default CommentComponent;
