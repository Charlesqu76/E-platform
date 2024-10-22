import { useProdcutsStore } from "@/store/products";
import { Button, Input } from "antd";
import { useState } from "react";
import { AiFillPicture, AiTwotoneAudio } from "react-icons/ai";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const { fetProducts, searchText, setSearchText } = useProdcutsStore(
    (state) => state
  );
  const clickSearch = async () => {
    try {
      setLoading(true);
      await fetProducts();
    } finally {
      setLoading(false);
    }
  };
  const changeText = (e: { target: { value: string } }) => {
    setSearchText(e.target.value);
  };
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
      <Button type="primary" onClick={clickSearch} loading={loading}>
        Search
      </Button>
    </div>
  );

  return (
    <div className="w-full max-w-[800px] ">
      <Input
        className="border-gray-200 border-2"
        placeholder="input search text"
        size="large"
        suffix={suffix}
        value={searchText}
        onChange={changeText}
      />
    </div>
  );
};

export default Search;
