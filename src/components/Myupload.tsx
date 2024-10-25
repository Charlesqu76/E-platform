import { Upload } from "antd";
import { AiFillPicture } from "react-icons/ai";

interface IProps {
  successCb: (filepath: string) => void;
}

const HOST = "https://charlescrazy.fun/";
const PATH = "api/";

const MyUpload = ({ successCb }: IProps) => {
  const handleChange = (info: any) => {
    if (info.file.status === "done") {
      const { filepath } = info.file.response;

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
      <AiFillPicture className="text-2xl mr-2 hover:cursor-pointer" />
    </Upload>
  );
};

export default MyUpload;
