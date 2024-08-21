import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { Modal } from "~/components/Modal";
import { api } from "~/utils/api";

interface CommentComponentProps {
  projectId: string;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ projectId }) => {
  const [comment, setComment] = useState("");
  const [modalContent, setModalContent] = useState<{
    message: string;
    bgColor: string;
  } | null>(null);

  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  const dbUser = api.user.getByEmail.useQuery({ email: email! });

  const createComment = api.feedback.create.useMutation({
    onSuccess: () => {
      setComment("");
      setModalContent({
        message: "Your feedback has been successfully submitted.",
        bgColor: "bg-green-700",
      });
      setTimeout(() => {
        setModalContent(null);
      }, 2000);
    },
    onError: (error: any) => {
      console.error("Error creating comment:", error);
      setModalContent({
        message: `Error creating comment: ${error.message}`,
        bgColor: "bg-red-700",
      });
    },
  });

  const handleSubmit = () => {
    if (!user) {
      setModalContent({
        message: "You must be logged in to post a comment.",
        bgColor: "bg-gray-700",
      });

      setTimeout(() => {
        setModalContent(null);
      }, 2000);

      return;
    }

    if (!comment.trim()) {
      setModalContent({
        message: "Please leave a feedback before submitting.",
        bgColor: "bg-red-500",
      });

      setTimeout(() => {
        setModalContent(null);
      }, 2000);

      return;
    }

    if (user) {
      const commentInput = {
        userId: dbUser.data!.id,
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
            className="mb-4 h-[300px] rounded-lg border border-gray-600 bg-gray-50 p-2 text-lg outline-gray-500 md:h-[420px]"
            placeholder=" What’s on your mind?"
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
        {modalContent && (
          <Modal
            isOpen={true}
            onClose={() => setModalContent(null)}
            message={modalContent.message}
            bgColor={modalContent.bgColor}
          />
        )}
      </div>
    </div>
  );
};

export default CommentComponent;
