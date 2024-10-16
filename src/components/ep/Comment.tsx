import { TComment } from "@/type/product";
import Star from "../Star";

const Comment = ({ name, comment, rate }: TComment) => {
  return (
    <div className="p-2 border rounded-md">
      <div className="flex">
        <p className="font-semibold">{name}</p>
        <Star ratings={rate} />
      </div>
      <p className="text-gray-700">{comment}</p>
    </div>
  );
};

export default Comment;
