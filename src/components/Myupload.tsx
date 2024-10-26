import { Button, Upload } from "antd";
import { useState } from "react";
import { AiFillPicture } from "react-icons/ai";

interface IProps {
  successCb: (filepath: string) => void;
}

const HOST = "https://charlescrazy.fun/";
const PATH = "api/";

const MyUpload = ({ successCb }: IProps) => {
  const [loading, setLoading] = useState(false);
  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    }
    if (info.file.status === "done") {
      const { filepath } = info.file.response;
      setLoading(false);
      successCb?.(new URL(filepath, HOST).toString());
    }
  };

  return (
    <Upload
      action={`${HOST}${PATH}upload`}
      accept="image/*"
      onChange={handleChange}
      showUploadList={false}
    >
      <Button
        loading={loading}
        type="text"
        icon={<AiFillPicture className="text-2xl mr-2 hover:cursor-pointer" />}
      ></Button>
    </Upload>
  );
};

export default MyUpload;
