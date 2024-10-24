import { HOST, MY_PATH } from "@/utils/fetch";
import { Upload } from "antd";
import { AiFillPicture } from "react-icons/ai";

interface IProps {
  successCb: (filepath: string) => void;
}

const MyUpload = ({ successCb }: IProps) => {
  const handleChange = (info: any) => {
    if (info.file.status === "done") {
      const { filepath } = info.file.response;
      successCb?.(filepath);
    }
  };

  return (
    <Upload
      action={`${MY_PATH}upload`}
      accept="image/*"
      onChange={handleChange}
      showUploadList={false}
    >
      <AiFillPicture className="text-2xl mr-2 hover:cursor-pointer" />
    </Upload>
  );
};

export default MyUpload;
