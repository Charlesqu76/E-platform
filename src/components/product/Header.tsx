import { Avatar } from "antd";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-12 bg-[#f5f5f5] flex items-center justify-center">
      <div className="w-96 flex justify-between">
        <Link href={"/ep"}>
          <span className="font-bold">Home</span>
        </Link>
        <Avatar className="bg-red-500">H</Avatar>
      </div>
    </header>
  );
};

export default Header;
