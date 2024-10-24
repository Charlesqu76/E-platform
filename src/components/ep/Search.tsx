import { useProdcutsStore } from "@/store/products";
import { Button, Input } from "antd";
import { useState } from "react";
import { AiTwotoneAudio } from "react-icons/ai";
import MyUpload from "../Myupload";
import Image from "next/image";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const { fetProducts, searchText, setSearchText, setSearchImg, searchImg } =
    useProdcutsStore((state) => state);
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
    setSearchImg("");
  };
  const suffix = (
    <div className="flex items-center">
      {/* <AiTwotoneAudio
        className="text-2xl mr-2 hover:cursor-pointer"
        onClick={() => console.log(1)}
      /> */}
      <MyUpload
        successCb={(filepath) => {
          setSearchText("");
          setSearchImg(filepath);
        }}
      />
      <Button type="primary" onClick={clickSearch} loading={loading}>
        Search
      </Button>
    </div>
  );

  console.log(searchImg);

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
      {searchImg && (
        <Image
          className="p-1 rounded-sm"
          src={searchImg}
          height={200}
          width={200}
          alt="search image"
        />
      )}
    </div>
  );
};

export default Search;
