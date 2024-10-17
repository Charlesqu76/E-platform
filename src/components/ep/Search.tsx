import { setSearchText, useAppDispatch, useAppSelector } from "@/store/product";
import { Button, Input } from "antd";
import { AiFillPicture, AiTwotoneAudio } from "react-icons/ai";

const Search = () => {
  const { searchText } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const clickSearch = () => {
    // dispatch(searchProductThunk({ text: searchText }));
  };
  const changeText = (e: { target: { value: string } }) => {
    dispatch(setSearchText(e.target.value));
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
      <Button type="primary" onClick={clickSearch}>
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
