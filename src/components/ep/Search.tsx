import { Button, Input } from "antd";
import { AiFillPicture, AiTwotoneAudio } from "react-icons/ai";

const Search = () => {
  const suffix = (
    <div className="flex items-center">
      <AiTwotoneAudio
        className="text-2xl mr-2 hover:cursor-pointer"
        onClick={() => console.log(1)}
      />
      <AiFillPicture
        className="text-2xl mr-2 hover:cursor-pointer"
        onClick={() => console.log(2)}
      />
      <Button type="primary">Search</Button>
    </div>
  );

  return (
    <div className="flex">
      <Input
        className="border-red-300 border-2"
        placeholder="input search text"
        size="large"
        suffix={suffix}
      />
    </div>
  );
};

export default Search;
