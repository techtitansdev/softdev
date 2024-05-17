import { useUser } from "@clerk/nextjs";
import router from "next/router";
import { comment } from "postcss";
import result from "postcss/lib/result";
import { useState } from "react";
import { Modal } from "~/components/Modal";
import { api } from "~/utils/api";

interface CommentComponentProps {
  projectId: string;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ projectId }) => {
  const [comment, setComment] = useState("");
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const { user } = useUser();

  const createComment = api.feedback.create.useMutation({
    onSuccess: () => {
      setComment("");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 2000);
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
    },
  });

  const handleSubmit = () => {
    if (user) {
      const commentInput = {
        userId: user?.id,
        projectId: projectId,
        feedback: comment,
      };
      createComment.mutate(commentInput);
    }
  };

  return (
    <div className="mx-auto">
      <div className="items-center justify-center">
        <div className="flex flex-col">
          <label className="mb-2 text-xl font-medium sm:text-2xl md:mb-6 lg:text-3xl">
            Leave a Comment
          </label>

          <textarea
            data-testid="Leave a Comment"
            id="message"
            className="mb-4 h-[300px] rounded-lg border border-gray-600 bg-gray-50 p-2 text-lg md:h-[420px]"
            placeholder="What’s on your mind?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            className="self-end rounded-lg bg-gray-300 px-20 py-2 hover:bg-gray-400"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          message="Comment Left Successfully."
          bgColor="bg-green-700"
        />
      </div>
    </div>
  );
};

export default CommentComponent;
