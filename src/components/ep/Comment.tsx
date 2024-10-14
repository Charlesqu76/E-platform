import { IComment } from "@/type/product";

const Comment = ({ username, content }: IComment) => {
  return (
    <div className="p-2 border rounded-md">
      <p className="font-semibold">{username}</p>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default Comment;
