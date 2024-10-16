import { TComment } from "@/type/product";
import Comment from "./Comment";

interface IProps {
  AISummary: string;
  comments: TComment[];
}

const Comments = ({ comments, AISummary }: IProps) => {
  return (
    <div className="py-2">
      <div className="text-xl font-semibold mb-2">
        <p>AI Summary</p>
        <p>{AISummary || "..."}</p>
      </div>
      <p className="text-xl font-semibold mb-2">Comments</p>
      <div className="space-y-4">
        {comments.map((comment, i) => (
          <Comment key={i} {...comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
