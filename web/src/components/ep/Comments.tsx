import { TComment } from "@/type/product";
import Comment from "./Comment";
import { Button } from "antd";
import { getSummary } from "@/fetch/product";
import { useState } from "react";

import dynamic from "next/dynamic";
const Markdown = dynamic(() => import("react-markdown"));

interface IProps {
  comments: TComment[];
  id: string;
}

const Comments = ({ comments, id }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [summary, SetSummary] = useState("");
  if (!comments?.length) return <></>;
  const clickSummary = async () => {
    try {
      setLoading(true);
      const data = await getSummary({ id });
      if (data) {
        SetSummary((data as any)?.summary || "");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-2">
      <div className="flex justify-between">
        <p className="text-xl font-semibold mb-2">Comments</p>
        <Button
          size="small"
          type="primary"
          onClick={clickSummary}
          loading={loading}
        >
          Summary
        </Button>
      </div>

      {summary && (
        <div className="p-2 border rounded-md mb-2 ">
          <h3 className="font-bold">AI Summary</h3>
          <Markdown>{summary}</Markdown>
        </div>
      )}
      <div className="space-y-4">
        {comments.map((comment, i) => (
          <Comment key={i} {...comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
