import { AUTH_MAP } from "@/const";
import { useCommonStore } from "@/store";
import { logOut } from "@/utils";
import { Dropdown } from "antd";
import Link from "next/link";

const Header = () => {
  const { userInfo } = useCommonStore((state) => state);
  const items = [
    {
      key: "1",
      label: <span onClick={() => logOut(AUTH_MAP["ep"])}>Layout</span>,
    },
  ];

  return (
    <header className="h-12 bg-[#f5f5f5] flex items-center justify-center">
      <div className="flex justify-between w-full max-w-[800px]">
        <Link href={"/ep"}>
          <span className="font-bold">Home</span>
        </Link>
        {userInfo ? (
          <Dropdown menu={{ items }}>
            <span className="underline text-gray-600 text-sm ">
              {userInfo.name}
            </span>
          </Dropdown>
        ) : (
          <Link href={"/ep/login"}>Log in</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
